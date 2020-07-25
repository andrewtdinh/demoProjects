export default function getRandomInt(max) {
  const timeStamp = new Date().getTime();
  const maxInteger = max ?? timeStamp

  return Math.floor(Math.random() * Math.floor(maxInteger));
}
