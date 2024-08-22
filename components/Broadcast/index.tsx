import NavBar from "@components/NavBar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ReqModal from "@components/Broadcast/CreateRequest";
import axios from "axios";
import { API_URL } from "@utils/config";
import { BroadcastsType } from "@utils/types";
import { useSession, useSite } from "@utils/store";

const Broadcast = () => {
  const [reqModal, setReqModal] = useState(false)
  const [reqquan, setReqquan] = useState("")
  const [reqData, setReqData] = useState("")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<BroadcastsType[]>([])
  const [load, setLoad] = useState(false)
  const { site_id } = useSite()
  const { uid } = useSession()

  const closeRequestModal = () => {
    if (reqModal) {
      setReqModal(false)
    }
  }
  const openRequestModal = () => {
    if (!reqModal) {
      setReqModal(true)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/product`);
        setData(data.reqs)
        console.log(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const reqSubmit = async () => {
    try {
      setLoad(true)
      const { data } = await axios.post(`${API_URL}/product`, {
        receiver: site_id,
        p_name: reqData,
        quantity: reqquan,
        token: uid
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }
  return (
    <View className="min-h-screen bg-[#ede3da] flex flex-row pt-20">
      <NavBar link="Broadcast" />
      {reqModal && <ReqModal closeModal={closeRequestModal} quantity={reqquan} setQuantity={setReqquan}
        product={reqData} setProduct={setReqData} submit={reqSubmit} />}
      {load && <Loading />}
      {
        //  <Text>{JSON.stringify(data, null, 2)}</Text> 
      }
      {
        loading ?
          <Text>
            Loading
          </Text> :
          <ScrollView className="mb-10">
            {data.map((ele, idx) => {
              return (< Coponenet data={ele} setLoad={setLoad} key={idx} />)
            })
            }
          </ScrollView>
      }
      {site_id &&
        <TouchableOpacity className="absolute bottom-0 left-0 right-0 bg-orange-500 py-2 rounded-lg flex justify-center items-center w-full"
          onPress={openRequestModal}
        >
          <Text className="text-white py-2">
            Request
          </Text>
        </TouchableOpacity>
      }
    </View>
  )
}
const Coponenet = ({ data, setLoad }: { data: BroadcastsType, setLoad: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { site_id } = useSite()
  const { uid } = useSession()
  const satisfyRequest = async () => {
    try {
      setLoad(true)
      const obj = {
        sender: site_id,
        p_id: data.p_id,
        token: uid
      }
      console.log(obj)
      const resData = await axios.put(`${API_URL}/product`, obj)
      console.log(resData.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }
  const recievedProduct = async () => {
    try {
      setLoad(true)
      const recData = await axios.post(`${API_URL}/product/receive`, {
        token: uid,
        p_id: data.p_id
      })
      console.log(recData.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }
  return (
    <View className={`w-screen flex flex-col ${(site_id == data.receiver) ? "items-end" : "items-start"} px-4 py-2`}>
      <Text className="text-gray-800 px-2">
        {data.receiver_name}
      </Text>
      <View className="border border-gray-300 rounded-lg p-4 mt-2 bg-white shadow-sm w-5/12">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-gray-600 font-medium mr-1">
            Product
          </Text>
          <Text className="text-gray-800">
            {data.p_name}
          </Text>
        </View>
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-gray-600 font-medium mr-1">
            Quantity
          </Text>
          <Text className="text-gray-800">
            {data.quant}
          </Text>
        </View>
        <View className="flex flex-row justify-between mb-2 items-center">
          <Text className="text-gray-600 font-medium mr-1 text-center">
            Status
          </Text>
          <View>
            {
              (data.receive_time) ?
                <Text className="text-red-600">
                  Satisfied
                </Text> :
                (data.sender) ?
                  (
                    (site_id == data.receiver) ?
                      <TouchableOpacity className="bg-green-500 p-2 rounded-lg"
                        onPress={recievedProduct}
                      >
                        <Text className="text-white">
                          Recieved
                        </Text>
                      </TouchableOpacity>
                      :
                      <Text className="text-gray-500">
                        Supplied
                      </Text>
                  ) :
                  (
                    (site_id == data.receiver) ?
                      <Text className="text-gray-500">
                        Pending
                      </Text>
                      :
                      <TouchableOpacity className="bg-blue-500 py-2 px-3 rounded-lg"
                        onPress={satisfyRequest}
                      >
                        <Text className="text-white">
                          Satisfy
                        </Text>
                      </TouchableOpacity>
                  )
            }
          </View>
        </View>
        {
          (data.sender_name) &&
          <Text className="text-sm text-gray-500">
            From {data.sender_name}
          </Text>
        }
      </View>
    </View>

  )
}
const Loading = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-screen flex justify-center items-center bg-[#00000050]">
      <Text>
        Sending
      </Text>
    </View>
  )
}
export default Broadcast;
