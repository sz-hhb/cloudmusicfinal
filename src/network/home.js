import { request } from "./request";

const method = "POST";

//相关参数要与实体类名字一样

//User相关请求

// 增加用户
export function insertUser(
  uid,
  userName,
  email,
  password,
  phone,
  address,
  status,
  remark
) {
  return request({
    method: "POST",
    url: "/user/insert",
    data: {
      uid,
      userName,
      email,
      password,
      phone,
      address,
      status,
      remark
    }
  });
}

// 删除单条用户
export function deleteUser(uid) {
  return request({
    method,
    url: "/user/delete",
    data: {
      uid
    }
  });
}

// 删除多条用户
export function deletesUser(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "user/deletes",
    data: ids
  });
}

// 获取用户列表
export function userList() {
  return request({
    method: "POST",
    url: "/user/list"
  });
}

//根据id查找单个用户
export function findUserById(uid) {
  return request({
    method: "POST",
    url: "/user/find",
    data: {
      uid
    }
  });
}

// 更新用户
export function updateUserList(
  uid,
  userName,
  email,
  password,
  phone,
  address,
  createTime,
  status,
  remark
) {
  return request({
    method: "POST",
    url: "/user/update",
    data: {
      uid,
      userName,
      email,
      password,
      phone,
      address,
      createTime,
      status,
      remark
    }
  });
}

// MusicType相关请求

// 增加音乐类型
export function insertMusicType(musictypename) {
  return request({
    method,
    url: "music/insert",
    data: {
      musictypename
    }
  });
}

// 删除单条音乐类型
export function deleteMusicTypeById(musictypeid) {
  return request({
    method,
    url: "/music/delete",
    data: {
      musictypeid
    }
  });
}

// 查找音乐类型列表
export function musicTypeList() {
  return request({
    method: "POST",
    url: "/music/type"
  });
}

// 更新音乐类型列表
export function updateMusicTypeById(musictypeid, musictypename) {
  return request({
    method,
    url: "/music/update",
    data: {
      musictypeid,
      musictypename
    }
  });
}

export function deletesMusicTypeById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/music/deletesMusicType",
    data: ids
  });
}

//Music相关请求

// 查找音乐列表
export function musicList() {
  return request({
    method: "POST",
    url: "/music/list"
  });
}

// 查找单条音乐
export function findMusicById(musicid) {
  return request({
    method,
    url: "/music/findMusic",
    data: {
      musicid
    }
  });
}

// 删除单条音乐
export function deleteMusicById(musicid) {
  return request({
    method,
    url: "/music/deleteMusic",
    data: {
      musicid
    }
  });
}

// 删除多条音乐
export function deletesMusicById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/music/deletesMusic",
    data: ids
  });
}

//SingerType相关请求

// 增加歌手类型
export function insertType(typename) {
  return request({
    method,
    url: "/singer/insert",
    data: {
      typename
    }
  });
}

// 删除歌手类型
export function deleteType(typeid) {
  return request({
    method,
    url: "/singer/delete",
    data: {
      typeid
    }
  });
}

// 查找歌手类型列表
export function singerTypeList() {
  return request({
    method,
    url: "/singer/type"
  });
}

// 更新音乐类型
export function updateType(typeid, typename) {
  return request({
    method,
    url: "/singer/update",
    data: {
      typeid,
      typename
    }
  });
}

export function deletesSinerTypeByid(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/singer/deletesSingerType",
    data: ids
  });
}

// Singer相关请求

// 查找歌手列表
export function singerList() {
  return request({
    method,
    url: "singer/list"
  });
}

// 查找单个歌手
export function findSingerById(singerid) {
  return request({
    method,
    url: "/singer/findSinger",
    data: {
      singerid
    }
  });
}

// 删除单条歌手列表
export function deleteSingerById(singerid) {
  return request({
    method,
    url: "/singer/deleteSinger",
    data: {
      singerid
    }
  });
}

// 删除多条歌手列表
export function deletesSingerById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/singer/deletesSinger",
    data: ids
  });
}

//Video相关请求

// 查找视频列表
export function videoList() {
  return request({
    method,
    url: "video/list"
  });
}

// 查找单条视频
export function findVideoById(videoid) {
  return request({
    method,
    url: "video/findVideo",
    data: {
      videoid
    }
  });
}

// 删除单条视频
export function deleteVideoById(videoid) {
  return request({
    method,
    url: "/video/deleteVideo",
    data: {
      videoid
    }
  });
}

// 删除多条视频
export function deletesVideoById(ids) {
  return request({
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    url: "/video/deletesVideo",
    data: ids
  });
}
