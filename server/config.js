const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://dan123:dan123@ds147003.mlab.com:47003/mern-comment-box',
  port: process.env.PORT || 8000,
};

export default config;