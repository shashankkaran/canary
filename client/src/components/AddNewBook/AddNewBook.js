import React, { useState, useContext, useReducer, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import styles from "./AddNewBook.module.css";
import { GiCancel } from "react-icons/gi";
import Button from "../UI/Button/Button";
import UserFormField from "../UI/UserFormField/UserFormField";
import SelectCategory from "../UI/SelectCategory/SelectCategory";

const AddUser = () => {
    const { addUser } = useContext(GlobalContext);
    const history = useHistory();
    const [isFormValid, setIsFormValid] = useState(true);

    //book title
    const [bookTitle, dispatchBookTitle] = useReducer(
        (state, action) => {
            if(action.type === "USER_INPUT"){
                return {value: action.val, isValid: action.val.length > 5}
            }
            
            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //book price
    const [bookAuthor, dispatchBookAuthor] = useReducer(
        (state, action) => {
            if(action.type === "USER_INPUT"){
                return {value: action.val, isValid: action.val.length > 5}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //bookprice
    const [bookPrice, dispatchBookPrice] = useReducer(
        (state, action) => {
            if(action.type === "USER_INPUT"){
                return {value: action.val, isValid: action.val.length >= 1}
            }
            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //bookSelect
    const [bookCategory, dispatchBookCategory] = useReducer(
        (state, action) => {
            if(action.type === 'USER_INPUT'){
                return {value: action.val, isValid: action.val !== ''}
            }

            return {value: '', invalid: false}
        },
        {value: '', isValid: false}
    )

    const { isValid: bookTitleIsValid} = bookTitle;
    const { isValid: bookAuthorIsValid} = bookAuthor;
    const { isValid: bookPriceIsValid} = bookPrice;
    const { isValid: bookCategoryIsValid} = bookCategory;

    const onSubmit = function (e) {
        e.preventDefault()
        if(isFormValid !== true) return

        const newBook = {
            bookName: bookTitle.value,
            bookAuthor: bookAuthor.value,
            bookPrice: bookPrice.value,
            bookCategory: bookCategory.value,
        };

        Axios.post("https://canary-cqbc.onrender.com/insert", {
            bookName: bookTitle.value,
            bookPrice: bookPrice.value,
            bookAuthor: bookAuthor.value,
            bookCategory: bookCategory.value,
        });
        addUser(newBook);
        history.push("/");
    };

    const onBookTitleChange = function (e) {
        dispatchBookTitle({type: "USER_INPUT", val: e.target.value} )
    };

    const onAuthorChange = function (e) {
        dispatchBookAuthor({type: 'USER_INPUT', val: e.target.value});
    };

    const onPriceChange = function (e) {
        dispatchBookPrice({type: "USER_INPUT", val: e.target.value})
        
    };

    const onCategoryChange = function (e) {
        dispatchBookCategory({type: "USER_INPUT", val: e.target.value});
    };

    return (
        <form onSubmit={onSubmit} className={`${styles.form}`}>
            <UserFormField
                label="Domain"
                value={bookTitle.value}
                type="text"
                placeholder="Domain Name"
                onChange={onBookTitleChange}
                className={`${bookTitle.isValid === false ? styles.invalid : ''}`}
            />

            <UserFormField
                label="Type"
                value={bookAuthor.value}
                type="text"
                placeholder="Type"
                onChange={onAuthorChange}
                className={`${bookAuthor.isValid === false ? styles.invalid : ''}`}
            />

            <UserFormField
                label="Price"
                value={bookPrice.value}
                type="number"
                placeholder="enter book price"
                onChange={onPriceChange}
                className={`${bookPrice.isValid === false ? styles.invalid : ''}`}
            />

            <SelectCategory onChange={onCategoryChange}/>

            <div className={styles.buttons}>
                <Button type="submit" className={`${isFormValid ? styles.submit : styles.disabled}`}>
                    Submit
                </Button>
                <Link to="/" className={styles.link}>
                    <GiCancel /> Cancel
                </Link>
            </div>
        </form>
    );
};

export default AddUser;
