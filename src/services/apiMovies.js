import request from "../utils/request";

//接口3 获取当前已上架电影信息（七部热门影片）
export const getMoviesOnShelf = () => {
  return request(`/movie/popular`, {
    method: "GET",
  });
};

//接口5 获取某部电影详情
export const getMovieDetails = (movieId) => {
  return request(`/movie/detail/${movieId}`, {
    method: "GET",
  });
};



