import React, { useState, useEffect } from 'react';
import '../App.css';
import '../custom.css';
import config from '../config';
import { useNavigate } from "react-router-dom";
import CollapseComponent from './CollaspeComponent';
import AddReview from './AddReview';
import GetReviews from './GetReviews';
import
  {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Collapse,
    CardBody,
    Card,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const Visitlist = (props) => 
{
    const { setVisitState, state } = props;
    const navigate = useNavigate()
    let restaurantsList = []
    const [restaurantData, setRestaurantData] = useState([])
    const [userReviewModal, setUserReviewModal] = useState(false);
    const toggleUserReview = (key) => {setUserReviewModal(!userReviewModal); setRestID(key)};
    const [isOpenList, setIsOpenList] = useState([]);
    const [restID, setRestID] = useState()
    const toggle = (index) => {
        const newIsOpenList = [...isOpenList];
        newIsOpenList[index] = !newIsOpenList[index];
        setIsOpenList(newIsOpenList);
      };

    useEffect(() => {
        const fetchData = async () => {
            await getVisitlist(); // await the function call
            // set restaurantData to the fetched data
            setRestaurantData(restaurantsList);
            // setIsOpenList(new Array(restaurantsList.length).fill(false));
        }
        fetchData();
      }, [state]);
      // useEffect(() => {
      //   const fetchData = async () => {
      //       //update wishlist when item is deleted
      //       await getWishlist(); 
      //   }
      //   fetchData();
      // }, [restaurantData]);
    const getVisitlist = async() =>
    {
        const data = {
            token : localStorage.getItem("token")
        }

        try
        {
            const response = await axios.post(`${config.url}/api/visited`, data)

            for(let i in response.data.wishlist)
            {
                //console.log(response.data.wishlist[i].name)
                restaurantsList.push(
                {
                key : response.data.wishlist[i]._id,
                name : response.data.wishlist[i].name,
                rating : response.data.wishlist[i].rating,
                city : response.data.wishlist[i].location.city,
                state : response.data.wishlist[i].location.state,
                zipCode : response.data.wishlist[i].location.zip_code,
                country : response.data.wishlist[i].location.country,
                address : response.data.wishlist[i].location.address1,
                price : response.data.wishlist[i].price,
                imageURL : response.data.wishlist[i].image_url,
                restURL : response.data.wishlist[i].url,
                phone : response.data.wishlist[i].phone
                })
            }
            setRestaurantData(restaurantsList)
            } 
        catch (error)
        {
            console.error('Error:', error);
            if(error.response.status == 401){
                navigate('/login')
              }
        }
    }
    const removeFromVisitlist = async(key) =>{
        const data = {
            token : localStorage.getItem("token"),
            restaurantID : key
        }
        let check = confirm('Delete restaurant from wishlist?');
        if(check){
        try{
            const response = await axios.post(`${config.url}/api/history-delete`, data)
            console.log("Restaurant successfully deleted from visited");
            await getVisitlist(); // await the function call
            // set restaurantData to the fetched data
            setRestaurantData(restaurantsList);
            setIsOpenList(new Array(restaurantsList.length).fill(false));
            setVisitState(!state);
        }catch(error){
            console.log(error)
            if(error.response.status == 401){
                navigate('/login')
              }
        }
    }
    }

    return (
        <div className='wishlist'>
            <h1 id='wishTitle'>Visited Restaurants</h1>
            {restaurantData.map((restaurant, index) => (
                <div key={restaurant.key} className='wishlistNameDiv'>
                    <h1 id='name'>{restaurant.name}</h1>
                    <Button className='showMoreButton' color="secondary" onClick={() => toggle(index)} style={{ marginBottom: '0.5rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
                        {isOpenList[index] ? 'Hide' : 'Show'} {/*change button text based on state*/}
                    </Button>
                    
                    <Collapse isOpen={isOpenList[index]} >
                        <Card id='wishCard'>
                            <CardBody>
                                <div className='restaurantInfo'>
                                    <img src={restaurant.imageURL} className="wishlistRestaurantImg"/>
                                    <br />
                                    <b>cost:</b> {restaurant.price} <br/>
                                    <b>Address:</b> {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zipCode}<br />
                                    <b>Rating:</b> {restaurant.rating} Stars <GetReviews restaurant={restaurant} /><br />
                                    <b>phone :</b> {restaurant.phone} <br /> 
                                    <AddReview restaurantID={restaurant.key} />
                                    <Button className='insideWishlistButton' color='danger' size='sm' onClick={() =>removeFromVisitlist(restaurant.key)}>Remove</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

    ))}
        </div>
    )
}

export default Visitlist;