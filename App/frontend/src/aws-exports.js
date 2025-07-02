const awsConfig = {
  Auth: {
    region: 'us-east-2', // ajuste para sua região
    userPoolId: 'us-east-2_GoP3BTQmp', // ajuste para seu User Pool ID
    userPoolWebClientId: '615jagf2ag37dt59athbg6r3ut', // ajuste para seu App Client ID
    mandatorySignIn: true,
  },
};

export default awsConfig; 