import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsInProgress from '../components/IngredientsInProgress';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkRecipe } from '../services/fetchFoodsAndDrinks';
import shareIcon from '../images/shareIcon.svg';

function DrinksInProgress() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { setError } = useContext(RecipesContext);
  const { idReceita } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [copied, setCopied] = useState(false);
  const redirect = pathname.includes('/drinks') ? 'drinks' : 'foods';
  const key = pathname.includes('/foods') ? 'Meal' : 'Drink';
  const foodsPath = pathname.includes('/foods');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetchDrinkRecipe(idReceita, setRecipe, setError);
  }, [idReceita, setError]);

  const handleClickDone = () => {
    history.push('/done-recipes');
  };

  const shareFunc = () => {
    copy(`http://localhost:3000/${redirect}/${idReceita}`);
    setCopied(true);
  };

  return (
    <div>
      {recipe.length && (

        <>
          <img
            src={ recipe[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt="algo"
            width="200px"
          />
          <h2
            data-testid="recipe-title"
          >
            {recipe[0].strDrink}
          </h2>
          {copied && <p>Link copied!</p>}
          <button type="button" onClick={ shareFunc }>
            <img
              src={ shareIcon }
              alt="Share"
              data-testid="share-btn"
            />
          </button>
          <FavoriteButton recipe={ recipe } foodsPath={ foodsPath } keyPath={ key } />
          <p data-testid="recipe-category">{ recipe[0].strAlcoholic }</p>
          <IngredientsInProgress recipe={ recipe } isDisabled={ setIsDisabled } />
          <section data-testid="instructions">
            <h4>Instructions</h4>
            <p>{recipe[0].strInstructions}</p>
          </section>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ handleClickDone }
          >
            Finish Recipe
          </button>
        </>
      )}

    </div>
  );
}

export default DrinksInProgress;
