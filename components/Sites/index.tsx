import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Container from "@components/Sites/Container";
import NavBar from "@components/NavBar";
import axios from "axios";
import { API_URL } from "@utils/config";
import { Site } from "@utils/types";

const ListSites = () => {
  const [sites, setSites] = useState<Array<Site>>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${API_URL}/site`)
        setSites(data.sites)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  return (
    <View className="min-h-screen bg-[#ede3da] flex items-center pt-20">
      <NavBar link="Sites of Goodwill" />
      {loading && <Text className="text-xl">Loading...</Text>}
      {
        sites.map((ele, idx) => (
          <Container key={idx} s_name={ele.s_name} lat={ele.latitude} lng={ele.longitude} />
        ))
      }
    </View>
  )
}
export default ListSites;
