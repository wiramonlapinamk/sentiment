// import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";
import "./App.css";

//npm i @tensorflow/tfjs

const App = () => {
  // tensorflow model
  // const [model, setModel] = useState(null);
  // const [metadata, setMetadata] = useState(null);

  // const loadModel = async () => {
  //   const loadedModel = await tf.loadLayersModel(
  //     "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json"
  //   );
  //   const loadedData = await fetch(
  //     "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json"
  //   ).then((response) => response.json());

  //   setModel(loadedModel);
  //   setMetadata(loadedData);
  //   console.log("Model Loaded");
  // };

  // const analyseSentiment = async () => {
  //   if (model !== null) {
  //     console.log("analysing sentiment. . .");
  //     const trimmed = inputText
  //       .trim()
  //       .toLowerCase()
  //       .replace(/(\.|\,|\!)/g, "")
  //       .split(" ");
  //     const inputBuffer = tf.buffer([1, metadata.max_len], "float32");
  //     trimmed.forEach((word, i) =>
  //       inputBuffer.set(metadata.word_index[word] + metadata.index_from, 0, i)
  //     );
  //     const input = inputBuffer.toTensor();
  //     const prediction = await model.predict(input);
  //     const score = prediction.dataSync()[0];
  //     prediction.dispose();
  //     setResult(score > 0.5 ? "positive" : "negative");
  //     console.log(result);
  //   }
  // };

  const [inputText, setInputText] = useState();
  const [result, setResult] = useState("");

  const sendMsg = () => {
    fetch("/predict", {
      method: "POST",
      body: inputText,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.message);
        setResult(res.message);
      });
  };

  useEffect(() => {
    // loadModel();
  }, []);

  return (
    <div className="App">
      <h1>Sentiment Analysis</h1>
      <div className="body-container">
        <div className="result">
          <div className="icon">
            {result == "pos" ? "🙂" : result == "neg" ? "😞" : "😐"}
          </div>
        </div>
        <div className="input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text here"
          />
          <button onClick={sendMsg}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default App;
