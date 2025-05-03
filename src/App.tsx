import { useState, ChangeEvent } from 'react'
import { storage } from './firebaseConfig'; // Importa la configuración de Firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './App.css'

// Componente para cargar imágenes
function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImageUrl(null); // Resetea la URL si se selecciona un nuevo archivo
      setUploadProgress(0); // Resetea el progreso
      setError(null); // Resetea errores
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Por favor, selecciona un archivo primero.");
      return;
    }

    setError(null); // Limpia errores previos
    const storageRef = ref(storage, `images/${file.name}`); // Crea una referencia en Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Escucha los cambios de estado, errores y finalización de la subida.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observa los eventos de cambio de estado como progreso, pausa y reanudación
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Maneja errores de subida
        console.error("Error al subir la imagen:", error);
        setError(`Error al subir: ${error.message}`);
      },
      () => {
        // Maneja subidas exitosas al completarse
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Archivo disponible en', downloadURL);
          setImageUrl(downloadURL); // Guarda la URL de la imagen subida
          setFile(null); // Opcional: limpiar el archivo seleccionado después de subir
        });
      }
    );
  };

  return (
    <div className="card">
      <h2>Subir Imagen a Firebase</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploadProgress > 0}>
        {uploadProgress > 0 ? `Subiendo (${uploadProgress.toFixed(0)}%)...` : 'Subir Imagen'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <progress value={uploadProgress} max="100" style={{ width: '100%', marginTop: '10px' }} />
      )}
      {imageUrl && (
        <div>
          <p>¡Imagen subida con éxito!</p>
          <img src={imageUrl} alt="Imagen subida" style={{ maxWidth: '300px', marginTop: '10px' }} />
          <p><a href={imageUrl} target="_blank" rel="noopener noreferrer">Ver imagen</a></p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Un día nuevo entoces subiré mas imágenes</h1>
      <ImageUploader />
    </>
  )
}

export default App
