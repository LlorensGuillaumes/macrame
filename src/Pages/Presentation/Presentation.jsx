import React from 'react'
import './Presentation.css';
import { LoremIpsum, loremIpsum } from 'lorem-ipsum';

const Presentation = () => {

    const loremText = loremIpsum({
        count:2,
        units:'paragraph',
        format: 'html',
    })
    
  return (
    <div className='presentationContainer'>
        <p dangerouslySetInnerHTML={{ __html: loremText }} className='presentation'></p>
    </div>
  )
}

export default Presentation