import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const App = () => {
  const [newFish, setFish] = useState('')
  const [fishList, addFish] = useState([])

  const fishInputHandler = (enteredText) => {
    setFish(enteredText)
  }

  const addFishToList = () => {
    // const newList = fishList.concat(newFish)
    // addFish(newList)
    addFish(fishList => [...fishList, newFish])
    setFish('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        <TextInput placeholder='Fish name' style={styles.inputStyle}
          onChangeText={fishInputHandler}
          value={newFish}
          onSubmitEditing={addFishToList}></TextInput>
        <Button style={styles.buttonStyle} title='Click' onPress={addFishToList}></Button>
        <StatusBar style='auto' />
      </View>
      <View style={styles.listStyle}>
        <Text>List</Text>
        {fishList.map((item, index) => {
          return <View style={styles.listItemStyle} key={index}><Text>{index}: {item}</Text></View>
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    backgroundColor: '#abc',
    width: '80%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#def',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 55,
    width: '100%',
  },
  listStyle: {
    flex: 8,
    alignItems: 'center',
    backgroundColor: '#eac',
    borderColor: 'green',
    borderWidth: 2,
    width: '100%',
  },
  inputStyle: {
    backgroundColor: '#abc',
    borderWidth: 2,
    borderColor: 'black',
    margin: 2,
    padding: 5,
    width: '50%',
  },
  buttonStyle: {
    margin: 2,
    padding: 5,
    width: '20%',
    color: 'white',
  }
});


export default App;