function starClasification() {
  navigator.mediaDevices.getUserMedia({ audio: true });
  classifier = ml5.soundClassifier("https://storage.googleapis.com/tm-model/tW69Uysb9/model.json", modelReady);


  let currentAudio = null;

  function modelReady() {
      classifier.classify(gotResults);
  }

  function gotResults(error, results) {
      if (error) {
          console.error(error);
          return;
      }

      console.log(results);

      // Generar colores aleatorios
      let random_number_r = Math.floor(Math.random() * 255) + 1;
      let random_number_g = Math.floor(Math.random() * 255) + 1;
      let random_number_b = Math.floor(Math.random() * 255) + 1;

      // Actualizar los textos con los resultados
      document.getElementById("result_label").innerHTML = "Escucho - " + results[0].label;
      document.getElementById("result_confidence").innerHTML = "Precisión - " + (results[0].confidence * 100).toFixed(2) + " %";
      document.getElementById("result_label").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";
      document.getElementById("result_confidence").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";

      //Etiquetas de sonido a nombres de archivo de audio
      let audioFiles = {
          "grita tulum": "Tulum.mp3",
          "grita ibiza": "Ibiza.mp3",
          "grita berlin": "Berlin.mp3",
          "grita cairo": "Cairo.mp3",
          "grita paris": "Paris.mp3"
      };

      // Identificar la etiqueta reconocida
      let recognizedLabel = results[0].label.toLowerCase();

      // Obtener el elemento de imagen correspondiente
      let targetImage;

      switch (recognizedLabel) {
          case "grita tulum":
              targetImage = document.getElementById("grita tulum");
              break;
          case "grita ibiza":
              targetImage = document.getElementById("grita ibiza");
              break;
          case "grita berlin":
              targetImage = document.getElementById("grita berlin");
              break;
          case "grita cairo":
              targetImage = document.getElementById("grita cairo");
              break;
          case "grita paris":
              targetImage = document.getElementById("grita paris");
              break;
          default:
              // Si no se reconoce la etiqueta, no hacemos nada
              console.warn("Etiqueta de sonido no reconocida:", recognizedLabel);
              return; // Salir de la función si no se reconoce la etiqueta
      }

      // Verificar si se encontró la imagen
      if (targetImage) {
          // Reiniciar la animación eliminando y reañadiendo la clase
          targetImage.classList.remove("zoom-animation");
          void targetImage.offsetWidth; // Fuerza el reflow para reiniciar la animación
          targetImage.classList.add("zoom-animation");

          // Reproducir el audio asociado a la imagen reconocida
          if (audioFiles[recognizedLabel]) {
              //Detener el aduio previo
              if (currentAudio) {
                  currentAudio.pause();
                  currentAudio.currentTime = 0; // volver al inicio
              }

              let audio = new Audio(audioFiles[recognizedLabel]);
              currentAudio = audio; //Nuevo audio
              audio.play();
          } else {
              console.warn("No se encontró el archivo de audio para:", recognizedLabel);
          }
      } else {
          console.warn("No se encontró la imagen para la etiqueta:", recognizedLabel);
      }
  }
}
