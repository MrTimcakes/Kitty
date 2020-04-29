import Constants from 'expo-constants';

function getUserInfo() {
  const { deviceId, deviceName, platform, expoVersion, installationId } = Constants;
  return {
    deviceId,
    deviceName,
    platform,
    expoVersion,
    installationId,
  };
}
export default getUserInfo;