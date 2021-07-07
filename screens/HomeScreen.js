import { black, white } from "color-name";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import dictionary from "../database";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [isSearchPressed, searchPressed] = useState(false);
  const [word, setWord] = useState("");
  const [lexicalCategory, setLexicalCategory] = useState("");
  const [definition, setDefinition] = useState("");

  const getWord = (vocab) => {
    var searchKeyWord = vocab.toLowerCase();

    if (dictionary[searchKeyWord]) {
      var vocab_word = dictionary[searchKeyWord]["word"];
      var vocab_lexicalCategory = dictionary[searchKeyWord]["lexicalCategory"];
      var vocab_definition = dictionary[searchKeyWord]["definition"];

      setWord(vocab_word);
      setDefinition(vocab_definition);
      setLexicalCategory(vocab_lexicalCategory);
    } else {
      setWord(text);
      setDefinition("Not Found");
      setLexicalCategory("Unknown");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.inputBox}
        onChangeText={(vocab) => {
          setText(vocab);
          searchPressed(false);
          setWord("Loading...");
          setLexicalCategory("");
          setDefinition("");
        }}
        value={text}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          searchPressed(true);
          getWord(text);
        }}
      >
        <Text style={{ textAlign: "center", padding: 10, color: "white" }}>
          Search
        </Text>
      </TouchableOpacity>

      <View style={styles.wordInfo}>
        <Text style={{ fontSize: 50 }}>Word: {word}</Text>
        <Text style={{ fontSize: 50 }}>
          Lexical Category: {lexicalCategory}
        </Text>
        <Text style={{ fontSize: 25 }}> Definition: {definition} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 4,
    width: "50%",
    height: 40,
    margin: 50,
    alignSelf: "center",
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: "blue",
    width: 100,
    height: 40,
    alignSelf: "center",
  },
  wordInfo: {
    alignItems: "center",
    marginTop: 50,
  },
});
