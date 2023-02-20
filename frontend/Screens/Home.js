

import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {Card, FAB} from 'react-native-paper';




function Home(props) {

const [data, setData ] = useState([])
const [loading, setLoading]  =  useState(true)

const loadData = () =>{
    fetch('http://192.168.5.30:8000/api/articles/', {
        method:"GET"
    })

    .then((resp) => resp.json())
    .then(data => {
        setData(data)
        setLoading(false)
    })
    .catch(error => Alert.alert("Error", error))
}

useEffect(() => {
    loadData();

}, [])


    const clickedItem = (data) => {
        props.navigation.navigate("Details", {data:data})
    }

    const renderData = (item) => {
        return(
            <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
                <Text style = {{fontSize:25}}>{item.title}</Text>
    
            </Card>
        )
    }

  return (

    <View style = {{flex:1}}>
        <FlatList
        data = {data}
        renderItem = {({item}) => {
            return renderData(item)
        }}
        onRefresh = {() => loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.id}`}
            
        />

        <FAB
             style = {styles.fab}
             small = {false}
             icon = "plus"
             theme = {{colors:{accent:"blue"}}}
             onPress = {() => props.navigation.navigate("Create")}
         />

    </View>
     
  )
}

const styles = StyleSheet.create({
    cardStyle:{
        padding:10,
        margin:10
    },
    fab: {
        position:'absolute',
        margin:16,
        right:0,
        bottom:0,
        backgroundColor:"blue"
    }
})

export default Home