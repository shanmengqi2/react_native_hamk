import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import FormView from './components/FormView';

type ItemType = {
  index: number;
  item: string;
}


const App = () => {
  const [newFish, setFish] = useState<string>('')
  const [fishList, addFish] = useState<string[]>([])

  const fishInputHandler = (enteredText: string) => {
    setFish(enteredText)
  }

  const keyHandler = (item: string, index: number) => {
    return index.toString()
  }

  const addFishToList = () => {
    // const newList = fishList.concat(newFish)
    // addFish(newList)
    addFish(fishList => [...fishList, newFish])
    setFish('')
  }

  const logPressEvent = (par1, par2) => {
    console.log(par1 + ": " + par2)
  }

  const deleteItem = (removeIndex: number) => {
    addFish(fishList => {
      return fishList.filter((fish, id) => {
        console.log("remove=" + removeIndex + " fishId=" + id)
        return id != removeIndex
      })
    })
  }

  const renderFish = (item: ItemType) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={() => deleteItem(item.index)}>
        <View style={styles.listItemStyle}>
          <Text>{item.index} {item.item}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <FormView onFishInput={fishInputHandler} onAddFish={addFishToList} />
      {/* <View style={styles.formView}>
        <TextInput placeholder="Fish name" style={styles.inputStyle}
          onChangeText={fishInputHandler}
          value={newFish}
          onSubmitEditing={addFishToList}></TextInput>
        <View style={styles.buttonStyle}>
          <Button title='Click' onPress={addFishToList}></Button>
        </View>
        <StatusBar style='auto' />
      </View> */}
      <View style={styles.listStyle}>
        <FlatList style={styles.flatliststyle}
          data={fishList}
          keyExtractor={keyHandler}
          renderItem={renderFish}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatliststyle: {
    width: '80%',
    backgroundColor: 'blue',
  },
  listItemStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    backgroundColor: '#abc',
    width: '80%',
    alignSelf: 'center'
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
    backgroundColor: '#eee',
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