

import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Button} from 'react-native-paper';

function ArticleDetails(props) {

    const data = props.route.params.data

    const deletedData = (data) => {
        fetch(`http://192.168.5.30:8000/api/articles/${data.id}/`, {
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        
        .then(data => {
            props.navigation.navigate("Home")
        })
        .catch(error => Alert.alert("Error", error))
    }
  return (
    <ScrollView>
            <View style = {styles.viewStyles}>
                <Text style = {{fontSize:25, margin:10}}>

                    {data.title}
                </Text>

                <Text style = {{fontSize:20, margin:10}}>
                    {data.description}
                </Text>
                
                <View style = {styles.btnStyle}>
                    <Button
                    icon = "update"
                    mode = "contained"
                    onPress = {() => props.navigation.navigate("Edit", {data:data})}
                    >Edit</Button>

                    <Button
                    icon = "delete"
                    mode = "contained"
                    onPress = {() => deletedData(data)}
                    >Delete</Button>

                </View>
        </View>

    </ScrollView>
    
    
    
  )
}

const styles = StyleSheet.create({
    viewStyles:{
        paddingTop:10,
        margin:10
    },
    btnStyle:{
        flexDirection:"row",
        justifyContent:"space-around",
        margin:15,
        padding:10
    }
})

export default ArticleDetails