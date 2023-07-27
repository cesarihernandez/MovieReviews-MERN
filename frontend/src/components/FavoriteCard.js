import "./favoritesList.css";
import FavoriteService from "../services/favorites";
import React, { useCallback, useRef } from 'react';
import {useDrag, useDrop} from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const FavoriteCard = (props) => {

    const swapFavorites = useCallback((dragIndex, hoverIndex) => {
        console.log('here', dragIndex, hoverIndex);
        const tempFavorites = [...props.favorites];
        const temp = tempFavorites[dragIndex]
        tempFavorites[dragIndex] = tempFavorites[hoverIndex];
        tempFavorites[hoverIndex] = temp;
        console.log('props favorites', tempFavorites);
        // tempFavorites //receiving favorites usiing props
        props.setFavorites(tempFavorites)
        const favoritesWithIdOnly = [] 
        tempFavorites.forEach(favorite => {
            favoritesWithIdOnly.push(favorite._id)
        })

        // Update backend 
        const data = {
            _id: props.user.googleId,
            favorites: favoritesWithIdOnly
        }
        FavoriteService.updateFavorites(data)
        .then(response => {

        })
        .catch(e => {
            console.log(e)
        })
      }, [])
    // props is an object {}

  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop(item, monitor) {

      if (!ref.current) {
        return
      }
      const dragIndex = props.i;
      const hoverIndex = item.index;
      console.log('hovering...', dragIndex, hoverIndex, item)
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      swapFavorites(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = dragIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id: props.favorite._id, index: props.i }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  console.log(isDragging)

    return (
        <div ref={ref} style={{ ...style, opacity }} key={props.favorite._id} className="favoritesCard" data-handler-id={handlerId}>
            <div role="Handle" ref={drag} />
             <div className="borderCard">
                <div className="favoritesNumber">
                    <p className="favoritesNumberOneDigit">
                        {props.i + 1}
                    </p>
                </div>
                <img className="favoritesPoster" src={props.favorite.poster} onError={(e) => {
                    e.currentTarget.onerror = null; // prevents looping 
                    e.currentTarget.src = "/images/NoPosterAvailable-crop.jpg";
                }} /> 
                <h1 className="favoritesTitle"> 
                    {props.favorite.title}
                </h1>

            </div> 
            
        </div>
    )

}

export default FavoriteCard;