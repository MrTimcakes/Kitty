import * as ImageManipulator from 'expo-image-manipulator';

function reduceImageAsync(uri) {
  return ImageManipulator.manipulateAsync(uri, [{ resize: { width: 512 } }], {
    compress: 0.8,
  });
}
export default reduceImageAsync;