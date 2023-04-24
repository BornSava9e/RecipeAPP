import { useState } from "react"
import axios from "axios"
import { useGetID } from "../hooks/useGetID";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";


export const CreateRecipe = () =>{
    const userID = useGetID();
    const [cookies,_] = useCookies(["access_token"])

    const [recipe, setRecipe] = useState({
        name : "",
        ingredients : [],
        instructions : "",
        imageUrl : "",
        cookingTime : 0,
        userOwner : userID,
    });
   
    const navigate = useNavigate()
    
        const handleChange = (event) =>{
        const { name, value } = event.target;
        setRecipe({...recipe, [name] : value})
    }
    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients });
      };

    const handleaddIngredient = () =>{
        setRecipe({...recipe, ingredients : [...recipe.ingredients, ""]})
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        try{
            if(recipe.name == "") return alert("name is required")
            if(recipe.instructions == "") return alert("instructions is required")
            if(recipe.imageUrl == "") return alert("imageUrl is required")
            if(recipe.cookingTime == "") return alert("cookingTime is required")
            if(recipe.userOwner == "") return alert("userOwner is required")
            if(recipe.ingredients == "") return alert("ingredients is required")
           let data = await axios.post("https://recipe-app-backend-flax.vercel.app/recipes", {...recipe},
            {headers: {authorization : cookies.access_token}})
            alert("Recipe created")

            navigate("/")
        }catch(err){
            console.error(err)
        }
    }

    return (
    <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
            {/* name*/ }
            <label htmlFor="name">Name</label>
            <input type = "text" id="name" name="name"  value ={recipe.name} onChange = {handleChange}/>
                                    
            {/* Ingredients*/ }
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
            <input key={index} type="text" name="ingredients" value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)} />
             ))}
            <button type="button" onClick = {handleaddIngredient}>Add Ingredient</button>
            
            {/* instructions*/ }
            <label htmlFor = "instructions">Instructions</label>
            <textarea id="instructions" name="instructions" value = {recipe.instructions} onChange ={handleChange}></textarea>

            {/* Image*/ }
            <label htmlFor="imageUrl" name ="imageUrl">Image Url</label>
            <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl}  onChange ={handleChange} />

            {/*Cooking time*/ }
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input type = "number" id = "cookingTime" name = "cookingTime" value = {recipe.cookingTime} onChange ={handleChange} />

            <button type = "submit">Create Recipe</button>
        </form>
    </div>)
}