// import { PrismaClient } from '@prisma/client'
// import style from "./style.module.scss"

// const prisma = new PrismaClient()

// export interface Hotel {
//   id: string
//   country: string
//   capital: string
//   picture: string
//   localisation: string
//   rooms?: Room[]
// }

// export interface Room {
//   id: string
//   hotelId: string
//   type: string
//   capacity: number
//   cost: number
//   pictures: string[]
//   options: Option[]
// }

// export interface Option {
//   id: string
//   roomsId: string
//   name: string
// }

// export async function getServerSideProps() {
//   const hotels: Hotel[] = await prisma.hotels.findMany({
//     include: {
//       Rooms: true,
//     },
//   })

//   return {
//     props: {
//       hotels,
//     },
//   }
// }

// const Hotels: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
//   return (
//     <div>
//         <div className={style.cards}>
//             {hotels.map((hotel) => (
//                 <div key={hotel.id} className={style.box}>
//                 <div className={style.box_card} style={{backgroundImage: `url(${hotel.picture})`}}>
//                 </div>
//                 <div className={style.box_text}>
//                     <p className={style.unerlinedRed}>{hotel.capital}</p>
//                     <p>{hotel.country}</p>
//                 </div>
//             </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Hotels
