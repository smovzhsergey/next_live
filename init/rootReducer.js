import { combineReducers } from 'redux';

// Reducers
import { carsReducer as cars } from "../bus/car/reducer";
import { discountsReducer as discounts } from "../bus/discount/reducer";
import { newsReducer as news } from "../bus/news/reducer";
import { userReducer as user } from "../bus/user/reducer";
import { asteroidsReducer as asteroids } from "../bus/asteroids/reducer";
import { clientAsteroidsReducer as clientAsteroids } from "../bus/clientAsteroids/reducer";
import { initialReducer as initial } from "../bus/initial/reducer";

export const rootReducer = combineReducers({
    asteroids,
    cars,
    clientAsteroids,
    discounts,
    news,
    user,
    initial,
});
