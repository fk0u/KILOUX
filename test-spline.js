import https from 'https';

const urls = [
  'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  'https://prod.spline.design/kZqRNbQpt1Mls0ND/scene.splinecode',
  'https://prod.spline.design/O-sR-202Xq935L7F/scene.splinecode'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${url} - ${res.statusCode}`);
  });
});
