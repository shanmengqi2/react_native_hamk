import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import FormView from './components/FormView';

type ItemType = {
  index: number;
  item: string;
}


const App = () => {
  const [visibility, setVisibility] = useState(false)
  const [newFish, setFish] = useState<string>('')
  const [fishList, addFish] = useState<string[]>([])
  const [mode, setMode] = useState<'add' | 'update'>('add')
  const [updateId, setUpdateId] = useState<number>(-1)

  const fishInputHandler = (enteredText: string) => {
    setFish(enteredText)
  }

  const keyHandler = (item: string, index: number) => {
    return index.toString()
  }

  const addFishToList = () => {
    if (newFish.trim().length > 0) {
      addFish(fishList => [...fishList, newFish])
      setFish('')
    }
    setVisibility(false)
  }

  const updateFishtoList = (id: number) => {
    if (newFish.trim().length > 0) {
      addFish(fishList => fishList.map((fish, idx) => idx === id ? newFish : fish));
      setFish('');
    }
    setVisibility(false);
  }

  const showUpdateMode = (id: number) => {
    setUpdateId(id)
    setMode('update')
    setVisibility(true)
    setFish(fishList[id])
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

  const showInputView = () => {
    setMode('add')
    setVisibility(true)
  }

  const cancelFish = () => {
    setVisibility(false)
  }

  const renderFish = (item: ItemType) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={() => showUpdateMode(item.index)}>
        <View style={styles.listItemStyle}>
          <Text>{item.index} {item.item}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <Modal visible={visibility} animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.formView}>
            <TextInput style={styles.inputStyle} placeholder='Fish breed...'
              onChangeText={fishInputHandler} value={newFish} />
          </View>
          <View style={styles.okcancelStyle}>
            <TouchableOpacity style={[styles.customButton, styles.okButton]} onPress={mode === 'add' ? addFishToList : () => updateFishtoList(updateId)}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.customButton, styles.cancelButton]} onPress={cancelFish}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <Modal visible={visibility} animationType="slide">
        <View style={styles.formView}>
          <TextInput style={styles.inputStyle} placeholder="Fish breed..."
            onChangeText={fishInputHandler}
            value={newFish}
          />
          <View style={styles.okcancelStyle}>
            <View style={styles.buttonView}><Button title='Ok' onPress={addFishToList} /></View>
            <View style={styles.buttonView}><Button title='Cancel' onPress={cancelFish} /></View>
          </View>
        </View>
      </Modal> */}
      <View style={styles.listStyle}>
        <View style={styles.buttonStyle}><Button title='Add new Fish' onPress={showInputView} /></View>
        <FlatList style={styles.flatliststyle}
          data={fishList}
          keyExtractor={keyHandler}
          renderItem={renderFish}
        />
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   flatliststyle: {
//     width: '80%',
//     backgroundColor: 'blue',
//   },
//   listItemStyle: {
//     borderWidth: 1,
//     borderColor: "blue",
//     padding: 5,
//     backgroundColor: "#abc",
//     width: "80%",
//     alignSelf: "center",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: "100%",
//   },
//   okcancelStyle: {
//     flexDirection: "row",
//     width: "60%",
//     justifyContent: "space-around",
//   },
//   formView: {
//     // flex:1,
//     // flexDirection:"row",
//     backgroundColor: "#def",
//     alignItems: "center",
//     justifyContent: "space-around",
//     marginTop: 50,
//     width: "100%",
//   },
//   listStyle: {
//     flex: 8,
//     alignItems: "center",
//     backgroundColor: "#eee",
//     borderColor: "green",
//     borderWidth: 2,
//     width: "100%",
//   },
//   inputStyle: {
//     backgroundColor: "#abc",
//     borderColor: "black",
//     borderWidth: 2,
//     margin: 2,
//     padding: 5,
//     width: "50%",
//   },
//   buttonStyle: {
//     margin: 2,
//     padding: 5,
//   },
//   buttonView: {
//     width: 80,
//   }
// });

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
    width: '100%'
  },
  modalContainer: { // Added a container for modal content
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#def',
  },
  okcancelStyle: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    marginTop: 20, // Added margin top
  },
  formView: {
    justifyContent: 'space-around',
    alignItems: 'center',
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
    borderColor: 'crimson',
    margin: 2,
    padding: 10, // Increased padding
    width: '80%', // Increased width
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: 95,
    padding: 0,
    marginBottom: 5,
    color: 'white',
    backgroundColor: 'rgba(83, 160, 236, 1)'
  },
  // Removed buttonView
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  okButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default App;