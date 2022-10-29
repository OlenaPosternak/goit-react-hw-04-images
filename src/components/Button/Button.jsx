import PropTypes from 'prop-types';

import { Button } from "./Button.module"
export const ButtonMore = ({onClic})=>{
    return    (<Button type="button" onClick={onClic}>Load more</Button>)
}

ButtonMore.propType = {
    onClic : PropTypes.func,
}