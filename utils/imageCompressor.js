import * as ImageManipulator from "expo-image-manipulator";

const imageCompressor = async (imageUri) => {
    console.log("compresstion called---------",imageUri)
  try {
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
      [{ resize: { width: 400, height: 400 } }],
      { compress: 0.1, format: ImageManipulator.SaveFormat.JPEG }
    );

    console.log("compressed image url inside----", manipResult.uri);
    return manipResult.uri;
  
  } catch (err) {
    console.log("image not compressed");
    console.log("image not compressed", err);
  }
};

export default imageCompressor