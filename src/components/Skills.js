import { observer } from 'mobx-react-lite'
import React, {useEffect, useContext, useState } from 'react'
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import {Container,Form} from 'react-bootstrap'
import { getSkills } from '../http/vacancyAPI'
const Skills = observer(({value, setValue}) => {
    const [skills, setSkills] = useState([])
    const handleChange = (val) => {
        setValue(val)
    }
    useEffect (() => {
        getSkills().then(response => {
            console.log('response',response)
            setSkills(response)
        })
    }, [])
    return (
        <div>
        <ToggleButtonGroup  style={{margin:10}} type="checkbox" value={value} onChange={handleChange}>
            {skills.map(skill =>
                        <ToggleButton id={skill.getskills.split(',')[0].substring(1, (skill.getskills.split(',')[0]).length)} value={skill.getskills.split(',')[1]} variant={'outline-dark'}>
                            {skill.getskills.split(',')[1]}
                        </ToggleButton>
            )}
        </ToggleButtonGroup>
        </div>
    )
})
 
export default Skills;