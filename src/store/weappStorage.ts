// src/storage/weappStorage.ts
import { StateStorage } from 'zustand/middleware'

export const weappStorage: StateStorage = {
  getItem: (name): string | null => {
    try {
      return wx.getStorageSync(name) || null
    } catch (error) {
      console.error('读取存储失败:', error)
      return null
    }
  },

  setItem: (name, value): void => {
    try {
      wx.setStorageSync(name, value)
    } catch (error) {
      console.error('存储失败:', error)
    }
  },

  removeItem: (name): void => {
    try {
      wx.removeStorageSync(name)
    } catch (error) {
      console.error('删除存储失败:', error)
    }
  }
}

