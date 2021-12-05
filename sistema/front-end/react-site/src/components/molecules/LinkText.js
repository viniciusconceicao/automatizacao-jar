import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../shared/Colors';

export function LinkText(props) {
    const {
        contentText = 'Texto com link'

    } = props

    return ( <Link>{contentText}</Link>)
}

LinkText.propTypes ={
    contentText: PropTypes.string,
}

const Link = styled.a `
font-size: 16px;
text-decoration: none;
color: ${Colors.gray.grayText};

&:hover {
    color: ${Colors.green.greenPrimary}
}
`