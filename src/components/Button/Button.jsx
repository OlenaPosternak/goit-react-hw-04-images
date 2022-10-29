import PropTypes from 'prop-types';

import { Button } from "./Button.module"
export const ButtonMore = ({onClick})=>{
    return    (<Button type="button" onClick={()=>onClick()}>Load more</Button>)
}

ButtonMore.propType = {
    onClic : PropTypes.func,
}