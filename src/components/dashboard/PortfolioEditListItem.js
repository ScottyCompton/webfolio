import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import portcats from 'fixtures/portcats';
import uuid from 'uuid';
import ImageWithPreloader from 'components/ImageWithPreloader';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortUp, faEdit, faTrash, faSortDown, faCaretRight} from '@fortawesome/free-solid-svg-icons'



const PortfolioEditListItem = (
    { portfolioItem, 
        handleDelete, 
        handleMoveUp, 
        handleMoveDown, 
        firstItem, 
        lastItem, 
        canReorder,
        currIdx
    }) => {


    const handleClickMoveUp = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        handleMoveUp(id, currIdx);
    }


    const handleClickMoveDown = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        handleMoveDown(id, currIdx);
    }


    const handleClickDelete = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        handleDelete(id);
    }


    let cats = [];
    if (portfolioItem.portcats && portfolioItem.portcats.length !== 0) {
        portfolioItem.portcats.forEach((catId) => {
            cats.push(`${portcats[catId].name}, `);
        })
        cats[cats.length - 1] = cats[cats.length - 1].replace(',', '')
    } else {
        cats.push('-- No Categories Selected --')
    }

    return (
        <div className="portfolio-list__list-item">
            <div className="portfolio-list__list-item-img"><ImageWithPreloader className="portfolio-list__list-item-preloader" src={portfolioItem.previewImg} /></div>
            <div className="portfolio-list__list-item-title"><h5>{portfolioItem.projectTitle}</h5></div>
            <div className="portfolio-list__list-item-cats">{cats.length !== 0 && cats.map((cat) => (<span key={uuid()}>{cat}</span>))}</div>
            <div className="portfolio-list__list-item-btns">
                <Link to={`/dashboard/portfolio/edit/${portfolioItem.id}`}><FontAwesomeIcon size="lg" icon={faEdit} /></Link>
                <Link to="/" data-id={portfolioItem.id} onClick={handleClickDelete}><FontAwesomeIcon size="lg" icon={faTrash} /></Link>
                {canReorder && 
                    <span>
                        {firstItem && <span className="portfolio-list__list-item-btns--moveup portfolio-list__list-item-btns--disabled"><FontAwesomeIcon size="2x" icon={faSortUp} /></span>}
                        {!firstItem && <Link to="/" data-id={portfolioItem.id} onClick={handleClickMoveUp} className="portfolio-list__list-item-btns--moveup"><FontAwesomeIcon size="2x" icon={faSortUp} /></Link>}
                        {lastItem && <span className="portfolio-list__list-item-btns--movedn portfolio-list__list-item-btns--disabled"><FontAwesomeIcon size="2x" icon={faSortDown} /></span>}
                        {!lastItem && <Link to="/" data-id={portfolioItem.id} onClick={handleClickMoveDown} className="portfolio-list__list-item-btns--movedn"><FontAwesomeIcon size="2x" icon={faSortDown} /></Link>}
                    </span>
                }
            </div>
        </div>
    )

};



export default PortfolioEditListItem;



    /* TODO: Implement drag & drop reordering when I have nothing better to do */

//const PortfolioEditListItem = ({id, index, moveCard, portfolioItem, handleDelete }) => {

        // const ref = useRef(null)
    // const [, drop] = useDrop({
    //     accept: 'portfolioListItem',
    //     hover(item, monitor) {
    //         if (!ref.current) {
    //             return
    //         }
    //         const dragIndex = item.index
    //         const hoverIndex = index
    //         // Don't replace items with themselves
    //         if (dragIndex === hoverIndex) {
    //             return
    //         }
    //         // Determine rectangle on screen
    //         const hoverBoundingRect = ref.current.getBoundingClientRect()
    //         // Get vertical middle
    //         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    //         // Determine mouse position
    //         const clientOffset = monitor.getClientOffset()
    //         // Get pixels to the top
    //         const hoverClientY = clientOffset.y - hoverBoundingRect.top
    //         // Only perform the move when the mouse has crossed half of the items height
    //         // When dragging downwards, only move when the cursor is below 50%
    //         // When dragging upwards, only move when the cursor is above 50%
    //         // Dragging downwards
    //         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //             return
    //         }
    //         // Dragging upwards
    //         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //             return
    //         }
    //         // Time to actually perform the action
    //         moveCard(dragIndex, hoverIndex)
            
    //         // Note: we're mutating the monitor item here!
    //         // Generally it's better to avoid mutations,
    //         // but it's good here for the sake of performance
    //         // to avoid expensive index searches.
    //         item.index = hoverIndex
    //     },
    // })
    // const [{ isDragging }, drag] = useDrag({
    //     item: { type: 'portfolioListItem', id, index },
    //     collect: monitor => ({
    //         isDragging: monitor.isDragging(),
    //     }),
    // })
    // const opacity = isDragging ? 0 : 1
    // drag(drop(ref))



    // return (
    //     <div className="portfolio-list__list-item" ref={ref} style={{opacity}}>
    //         <div className="portfolio-list__list-item-img"><ImageWithPreloader className="portfolio-list__list-item-preloader" src={portfolioItem.previewImg} /></div>
    //         <div className="portfolio-list__list-item-title"><h5>{portfolioItem.projectTitle}</h5></div>
    //         <div className="portfolio-list__list-item-cats">{cats.length !== 0 && cats.map((cat) => (<span key={uuid()}>{cat}</span>))}</div>
    //         <div className="portfolio-list__list-item-btns">
    //             <Link to={`/dashboard/portfolio/edit/${portfolioItem.id}`} className="btn btn-primary">Edit</Link>
    //             <Button data-id={portfolioItem.id} onClick={handleDelete} className="btn btn-danger">Delete</Button>
    //         </div>
    //     </div>
    // )
