import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.API_URL;

const reissueToken = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { Authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response?.status === 419) {
      delete req.session.jwt;
      return reissueToken(req, api);
    }
    return error.response;
  }
};

export const test = async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.status(tokenResult.data?.code).json(tokenResult.data);
      }
    }
    const result = await axios.get(`${URL}/test`, {
      headers: { Authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) {
      return res.json(error.response.data);
    }
    return next(error);
  }
};

export const getMyPosts = async (req, res, next) => {
  try {
    console.log(req);

    const result = await reissueToken(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const searchByHashtag = async (req, res, next) => {
  try {
    const result = await reissueToken(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
