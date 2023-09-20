import request from './index.js'
export const getReportData = () => request.get('/reportdata')
export const getSalesData = () => request.get('/saledata')
export const getKeywordData = () => request.get('/keyworddata')
export const getCategoryData = () => request.get('/categorydata')
export const getMapData = () => request.get('/mapdata')