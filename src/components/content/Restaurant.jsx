import React, { useReducer, useEffect } from 'react'
import defaultImg from '../../assets/default_restaurant.png'
import location from '../../assets/location.png'
import save from '../../assets/save-white.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { apiGetAllRestaurant } from '../../request/api'

const restaurantState = {
  showState: []
}

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case 'getAllData':
      return {
        showState: action.payload
      }
    default:
      return state
  }
}

const Restaurant = () => {
  const [state, dispatch] = useReducer(restaurantReducer, restaurantState)

  const fetchAllHotel = async () => {
    try {
      const { status, data } = await apiGetAllRestaurant(6, 0)
      if (status === 200) {
        dispatch({ type: 'getAllData', payload: data })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllHotel()
  }, [])

  const handleTextLength = (text, num) => {
    return text && text.length > num
      ? `${text.slice(0, num)} ...`
      : text && text.length < num
        ? text.slice(0, num)
        : ''
  }

  const { showState } = state

  return (
    <div className='flex flex-col px-10 xl:px-40 pt-20 gap-10'>
      <h2 className='items-start text-4xl font-normal'>餐飲</h2>
      <div className='flex flex-row overflow-x-scroll space-x-8 xl:flex-col gap-10 xl:justify-center text-grey-dark'>
        <div className='flex flex-nowrap py-10 xl:py-0 xl:grid grid-cols-7 xl:grid-cols-3 grid-rows-2 gap-x-5 gap-y-10'>
          {showState.length > 0 &&
            showState.map((hotel, i) => {
              const { Picture, Name, Description, Address } = hotel

              const counties = Address.slice(0, 3)
              const township = Address.slice(3, 6)

              return (
                <figure
                  key={i}
                  className='w-80 xl:w-full bg-grey-light rounded-3xl overflow-hidden shadow-xl grid grid-cols-2'
                >
                  {Picture.PictureUrl1
                    ? (
                    <img
                      src={Picture.PictureUrl1}
                      alt='hotel_picture'
                      className='w-full h-96 object-cover col-start-1 col-span-2 row-start-1 z-10'
                    />
                      )
                    : (
                    <img
                      src={defaultImg}
                      alt='hotel_picture'
                      className='w-full h-96 object-cover col-start-1 col-span-2 row-start-1 z-10'
                    />
                      )}
                  <img
                    src={save}
                    alt='save'
                    className='text-grey-light mt-1 z-20 overflow-hidden col-start-2 row-start-1 justify-self-end mr-5 mt-5 cursor-pointer'
                  />
                  <figcaption className='flex flex-col gap-3 py-3 px-6 col-start-1 col-span-2'>
                    <h3 className='text-2xl'>{Name}</h3>
                    <span className='flex gap-3'>
                      <img src={location} alt='location' />
                      <p className='text-xl'>{`${counties}, ${township}`}</p>
                    </span>
                    <p>{handleTextLength(Description, 110)}</p>
                  </figcaption>
                </figure>
              )
            })}
        </div>
        <div className='flex flex-col xl:flex-row justify-center xl:justify-end'>
          <a
            href='#'
            className='bg-secondary p-3 rounded-full xl:block flex gap-5 flex-col items-center'
          >
            <AiOutlineArrowRight className='text-7xl text-grey-light' />
            <p className='xl:hidden block vertical text-2xl pb-5 tracking-widest'>
              更多餐飲
            </p>
          </a>
        </div>
      </div>
    </div>
    // <div className='flex flex-col gap-10 justify-center pt-5 px-36 text-grey-dark'>
    //   <h2 className='items-start text-4xl font-normal'>餐飲</h2>
    //   <div className='grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-10'>
    //     {showState.length > 0 && showState.map((item, i) => {
    //       const { Address, Description, Name, Picture } = item

  //       const counties = Address.slice(0, 3)
  //       const township = Address.slice(3, 6)

  //       return (
  //         <figure
  //           key={i}
  //           className='bg-grey-light rounded-3xl overflow-hidden shadow-2xl grid grid-cols-2'
  //         >
  //           {Picture.PictureUrl1
  //             ? (
  //             <img
  //               src={Picture.PictureUrl1}
  //               alt='hotel_picture'
  //               className='w-full h-96 object-cover col-start-1 col-span-2 row-start-1 z-10'
  //             />
  //               )
  //             : (
  //             <img
  //               src={defaultImg}
  //               alt='hotel_picture'
  //               className='w-full h-96 object-cover col-start-1 col-span-2 row-start-1 z-10'
  //             />
  //               )}
  //           <img
  //             src={save}
  //             alt='save'
  //             className='text-grey-light mt-1 z-20 overflow-hidden col-start-2 row-start-1 justify-self-end mr-5 mt-5 cursor-pointer'
  //           />
  //           <figcaption className='flex flex-col gap-3 py-3 px-6 col-start-1 col-span-2'>
  //             <h3 className='text-2xl'>{Name}</h3>
  //             <span className='flex gap-3'>
  //               <img src={location} alt='location' />
  //               <p className='text-xl'>{`${counties}, ${township}`}</p>
  //             </span>
  //             <p>{handleTextLength(Description, 110)}</p>
  //           </figcaption>
  //         </figure>
  //       )
  //     })}

  //   </div>
  //   <div className='flex justify-end'>
  //     <a href='#' className='bg-secondary p-3 rounded-full'>
  //       <AiOutlineArrowRight className='text-7xl text-grey-light' />
  //     </a>
  //   </div>
  // </div>
  )
}

export default Restaurant
