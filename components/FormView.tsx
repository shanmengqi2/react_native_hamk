import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface IonFishInput { (a: string): void }
interface IonAddFish { (): void }

type ParameterType = {
	onFishInput: IonFishInput;
	onAddFish: IonAddFish;
}


const FormView = (props: ParameterType) => {
	return (
		<View style={styles.formView}>
			<TextInput style={styles.inputStyle} placeholder="Fish breed..."
				onChangeText={props.onFishInput} />
			<View style={styles.buttonStyle}>
				<Button title="Click!" onPress={props.onAddFish} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	formView: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#def',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 20,
		width: '100%'
	},
	inputStyle: {
		backgroundColor: '#abc',
		borderColor: 'black',
		borderWidth: 2,
		margin: 2,
		padding: 5,
		width: '50%',
	},
	buttonStyle: {
		margin: 2,
		padding: 5,
		width: '20%',
	}
})


export default FormView