import React, { forwardRef } from 'react';
import { InputContent } from './styles';

const Input = forwardRef((props, ref) => <InputContent {...props} ref={ref} />);

export default Input;
