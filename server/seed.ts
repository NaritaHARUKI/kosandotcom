// import mongoose from 'mongoose'
// import Band from './models/Band.ts'

// const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/band-app'

// mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// //シードデータ100件を作成
// const bands = [
//     {
//         "name": "band1",
//         "location": "location1",
//         "administrator": ["admin1"],
//         "links": ["link1"],
//         "description": "description1",
//         "images": [{"url": "url1", "hash": "hash1"}],
//         "movies": ["url1"]
//     },
//     {
//         "name": "band2",
//         "location": "location2",
//         "administrator": ["admin2"],
//         "links": ["link2"],
//         "description": "description2",
//         "images": [{"url": "url2", "hash": "hash2"}],
//         "movies": ["url2"]
//     },
//     {
//         "name": "band3",
//         "location": "location3",
//         "administrator": ["admin3"],
//         "links": ["link3"],
//         "description": "description3",
//         "images": [{"url": "url3", "hash": "hash3"}],
//         "movies": ["url3"]
//     },
//     {
//         "name": "band4",
//         "location": "location4",
//         "administrator": ["admin4"],
//         "links": ["link4"],
//         "description": "description4",
//         "images": [{"url": "url4", "hash": "hash4"}],
//         "movies": ["url4"]
//     },
//     {
//         "name": "band5",
//         "location": "location5",
//         "administrator": ["admin5"],
//         "links": ["link5"],
//         "description": "description5",
//         "images": [{"url": "url5", "hash": "hash5"}],
//         "movies": ["url5"]
//     },
//     {
//         "name": "band6",
//         "location": "location6",
//         "administrator": ["admin6"],
//         "links": ["link6"],
//         "description": "description6",
//         "images": [{"url": "url6", "hash": "hash6"}],
//         "movies": ["url6"]
//     },
//     {
//         "name": "band7",
//         "location": "location7",
//         "administrator": ["admin7"],
//         "links": ["link7"],
//         "description": "description7",
//         "images": [{"url": "url7", "hash": "hash7"}],
//         "movies": ["url7"]
//     },
//     {
//         "name": "band8",
//         "location": "location8",
//         "administrator": ["admin8"],
//         "links": ["link8"],
//         "description": "description8",
//         "images": [{"url": "url8", "hash": "hash8"}],
//         "movies": ["url8"]
//     },
//     {
//         "name": "band9",
//         "location": "location9",
//         "administrator": ["admin9"],
//         "links": ["link9"],
//         "description": "description9",
//         "images": [{"url": "url9", "hash": "hash9"}],
//         "movies": ["url9"]
//     },
//     {
//         "name": "band10",
//         "location": "location10",
//         "administrator": ["admin10"],
//         "links": ["link10"],
//         "description": "description10",
//         "images": [{"url": "url10", "hash": "hash10"}],
//         "movies": ["url10"]
//     },
//     {
//         "name": "band11",
//         "location": "location11",
//         "administrator": ["admin11"],
//         "links": ["link11"],
//         "description": "description11",
//         "images": [{"url": "url11", "hash": "hash11"}],
//         "movies": ["url11"]
//     },
//     {   
//         "name": "band12",
//         "location": "location12",
//         "administrator": ["admin12"],
//         "links": ["link12"],
//         "description": "description12",
//         "images": [{"url": "url12", "hash": "hash12"}],
//         "movies": ["url12"]
//     },
//     {
//         "name": "band13",
//         "location": "location13",
//         "administrator": ["admin13"],
//         "links": ["link13"],
//         "description": "description13",
//         "images": [{"url": "url13", "hash": "hash13"}],
//         "movies": ["url13"]
//     },
//     {
//         "name": "band14",
//         "location": "location14",
//         "administrator": ["admin14"],
//         "links": ["link14"],
//         "description": "description14",
//         "images": [{"url": "url14", "hash": "hash14"}],
//         "movies": ["url14"]
//     },
//     {
//         "name": "band15",
//         "location": "location15",
//         "administrator": ["admin15"],
//         "links": ["link15"],
//         "description": "description15",
//         "images": [{"url": "url15", "hash": "hash15"}],
//         "movies": ["url15"]
//     },
//     {
//         "name": "band16",
//         "location": "location16",
//         "administrator": ["admin16"],
//         "links": ["link16"],
//         "description": "description16",
//         "images": [{"url": "url16", "hash": "hash16"}],
//         "movies": ["url16"]
//     },
//     {
//         "name": "band17",
//         "location": "location17",
//         "administrator": ["admin17"],
//         "links": ["link17"],
//         "description": "description17",
//         "images": [{"url": "url17", "hash": "hash17"}],
//         "movies": ["url17"]
//     },
//     {
//         "name": "band18",
//         "location": "location18",
//         "administrator": ["admin18"],
//         "links": ["link18"],
//         "description": "description18",
//         "images": [{"url": "url18", "hash": "hash18"}],
//         "movies": ["url18"]
//     },
//     {
//         "name": "band19",
//         "location": "location19",
//         "administrator": ["admin19"],
//         "links": ["link19"],
//         "description": "description19",
//         "images": [{"url": "url19", "hash": "hash19"}],
//         "movies": ["url19"]
//     },
//     {
//         "name": "band20",
//         "location": "location20",
//         "administrator": ["admin20"],
//         "links": ["link20"],
//         "description": "description20",
//         "images": [{"url": "url20", "hash": "hash20"}],
//         "movies": ["url20"]
//     },
//     {
//         "name": "band21",
//         "location": "location21",
//         "administrator": ["admin21"],
//         "links": ["link21"],
//         "description": "description21",
//         "images": [{"url": "url21", "hash": "hash21"}],
//         "movies": ["url21"]
//     },
//     {
//         "name": "band22",
//         "location": "location22",
//         "administrator": ["admin22"],
//         "links": ["link22"],
//         "description": "description22",
//         "images": [{"url": "url22", "hash": "hash22"}],
//         "movies": ["url22"]
//     },
//     {
//         "name": "band23",
//         "location": "location23",
//         "administrator": ["admin23"],
//         "links": ["link23"],
//         "description": "description23",
//         "images": [{"url": "url23", "hash": "hash23"}],
//         "movies": ["url23"]
//     },
//     {
//         "name": "band24",
//         "location": "location24",
//         "administrator": ["admin24"],
//         "links": ["link24"],
//         "description": "description24",
//         "images": [{"url": "url24", "hash": "hash24"}],
//         "movies": ["url24"]
//     },
//     {
//         "name": "band25",
//         "location": "location25",
//         "administrator": ["admin25"],
//         "links": ["link25"],
//         "description": "description25",
//         "images": [{"url": "url25", "hash": "hash25"}],
//         "movies": ["url25"]
//     },
//     {
//         "name": "band26",
//         "location": "location26",
//         "administrator": ["admin26"],
//         "links": ["link26"],
//         "description": "description26",
//         "images": [{"url": "url26", "hash": "hash26"}],
//         "movies": ["url26"]
//     },
//     {
//         "name": "band27",
//         "location": "location27",
//         "administrator": ["admin27"],
//         "links": ["link27"],
//         "description": "description27",
//         "images": [{"url": "url27", "hash": "hash27"}],
//         "movies": ["url27"]
//     },
//     {
//         "name": "band28",
//         "location": "location28",
//         "administrator": ["admin28"],
//         "links": ["link28"],
//         "description": "description28",
//         "images": [{"url": "url28", "hash": "hash28"}],
//         "movies": ["url28"]
//     },
//     {
//         "name": "band29",
//         "location": "location29",
//         "administrator": ["admin29"],
//         "links": ["link29"],
//         "description": "description29",
//         "images": [{"url": "url29", "hash": "hash29"}],
//         "movies": ["url29"]
//     },
//     {
//         "name": "band30",
//         "location": "location30",
//         "administrator": ["admin30"],
//         "links": ["link30"],
//         "description": "description30",
//         "images": [{"url": "url30", "hash": "hash30"}],
//         "movies": ["url30"]
//     },
//     {
//         "name": "band31",
//         "location": "location31",
//         "administrator": ["admin31"],
//         "links": ["link31"],
//         "description": "description31",
//         "images": [{"url": "url31", "hash": "hash31"}],
//         "movies": ["url31"]
//     },
//     {
//         "name": "band32",
//         "location": "location32",
//         "administrator": ["admin32"],
//         "links": ["link32"],
//         "description": "description32",
//         "images": [{"url": "url32", "hash": "hash32"}],
//         "movies": ["url32"]
//     },
//     {
//         "name": "band33",
//         "location": "location33",
//         "administrator": ["admin33"],
//         "links": ["link33"],
//         "description": "description33",
//         "images": [{"url": "url33", "hash": "hash33"}],
//         "movies": ["url33"]
//     },
//   ]

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', async () => {
// try {
//     await Band.insertMany(bands)
//     console.log('Data import success')
//     db.close()
// } catch (error) {
//     console.error('Error with data import', error)
//     db.close()
// }
// })