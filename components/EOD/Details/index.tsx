import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import NavBar from "@components/NavBar";
import "react-native-get-random-values";
import { uploadFilesToS3 } from "@utils/AWSHelper"
import { BUCKET_NAME } from '@utils/config';

interface AssignedType {
  worker: string;
  quantity: number;
}

const Details = () => {
  const [tquantity, setTquantity] = useState("")
  const [assigned, setAssigned] = useState<Array<AssignedType>>([]);
  const [valueArr, setValueArr] = useState([
    'mason',
    'carpenter',
    'electrician',
    'plumber',
    'painter'
  ]);
  const [selectedWorker, setSelectedWorker] = useState<string | undefined>(valueArr[0])
  const [image, setImage] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedURLs, setUploadedURLs] = useState<Array<string>>([]);

  const uploadImages = async () => {
    if (image) {
      setLoading(true)
      await Promise.all(image.map(async (item) => {
        try {
          const fileExtension = item.split('.').pop();
          const fileName = `${Date.now()}.${fileExtension}`;
          const fileBlob = await fetch(item).then((res) => res.blob());
          await uploadFilesToS3(BUCKET_NAME, fileName, fileBlob);
          setUploadedURLs((prev) => [...prev, `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`]);
        } catch (error) {
          console.warn(error)
        } finally {
          setLoading(false)
        }
      }))
      console.log(uploadedURLs)
    } else {
      alert("Please add images")
    }
  }

  const removeImage = (uri: string) => {
    setImage(
      (prev) => {
        if (prev) { return prev.filter((ele) => ele !== uri) }
        else { return null }
      }
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImage((prev) => {
        if (prev) {
          if (prev.length <= 7) {
            return [...prev, result.assets[0].uri]
          } else {
            alert("Maximum 8 images can be uploaded")
            return prev
          }
        } else {
          return [result.assets[0].uri]
        }
      })
    }
  };

  const createField = () => {
    if (selectedWorker && tquantity) {

      if (parseInt(tquantity) <= 0) {
        return alert("Quantity should be greater than 0");
      }
      console.log(selectedWorker.length, parseInt(tquantity))
      setAssigned([...assigned, { worker: selectedWorker, quantity: parseInt(tquantity) }]);
      setValueArr(valueArr.filter((item) => item !== selectedWorker));
      if (valueArr.length > 1) {
        setSelectedWorker(valueArr[1]);
      } else {
        setSelectedWorker(undefined);
      }
    } else {
      return alert("Please fill all the fields")
    }
  }

  const removeField = (worker: string) => {
    setAssigned(assigned.filter((item) => item.worker !== worker));
    setValueArr([...valueArr, worker]);
    setSelectedWorker(worker);
  }

  return (
    <View className="h-[100vh] pt-20">
      <NavBar link="EOD Details" />
      <ScrollView className="mb-10">
        <Text className='text-center text-xl my-3'>
          Workers Details
        </Text>
        <View className='flex flex-row mx-3 my-2'>
          <View className='w-7/12 px-2 rounded-lg mx-3 border'>
            <Picker
              selectedValue={selectedWorker}
              onValueChange={(itemValue) =>
                setSelectedWorker(itemValue)
              }
            >
              {valueArr.map((item, idx) => {
                return (
                  <Picker.Item label={item} value={item} key={idx} />
                );
              })}
            </Picker>
          </View>
          <View className='basis-1/3'>
            <TextInput
              className='border rounded-lg p-2'
              placeholder='Count'
              keyboardType='numeric'
              value={tquantity}
              onChangeText={(text) => setTquantity(text)}
            />
          </View>
        </View>
        <View className="flex flex-row justify-center items-center">
          <TouchableOpacity
            className="bg-blue-500 py-3 px-4 rounded-lg mt-2"
            onPress={createField}
          >
            <Text
              className="text-white text-md"
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {
            assigned.map((item) => {
              return (
                <View className='flex flex-row mx-3 my-2'>
                  <TouchableOpacity className='flex items-center justify-center'
                    onPress={() => removeField(item.worker)}
                  >
                    <AntDesign name="close" size={20} color="black" />
                  </TouchableOpacity>
                  <View className='w-1/2 px-2 border rounded-lg mx-3 flex justify-center items-center'>
                    <Text>
                      {item.worker}
                    </Text>
                  </View>
                  <View className='basis-1/3'>
                    <View className='border-2 border-gray-300 rounded-lg p-2'>
                      <Text>
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>

        <Text className='text-center text-xl mt-2'>
          Prodcutivity Details
        </Text>
        <View className='flex flex-row justify-center items-center'>
          <TouchableOpacity
            className='bg-blue-500 rounded-lg my-3'
            onPress={pickImage}
          >
            <Text className='text-center text-md my-3 text-white mx-3'>
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
        <View className='flex justify-center items-center'>
          {image &&
            image.map((item, idx) => {
              return (
                <View key={idx} className='flex-row flex justify-center items-center'>
                  <TouchableOpacity className='flex items-center justify-center mx-3'
                    onPress={() => removeImage(item)}
                  >
                    <AntDesign name="close" size={20} color="black" />
                  </TouchableOpacity>
                  <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
                </View>
              )
            })
          }
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full">
        <TouchableOpacity
          className="bg-[#fc8019] flex justify-center items-center py-3 rounded-lg w-full"
          disabled={loading}
          onPress={uploadImages}
        >
          <Text className="text-lg font-semibold text-white">
            {
              loading ? 'Uploading...' : 'Upload Images and Submit EOD'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Details;
