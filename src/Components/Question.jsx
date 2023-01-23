import { Box, Container, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { useState } from "react";
import { RadioCard, RadioCardGroup } from "./RadioCardGroup"; 
import EditorComponent from "./Tiny/Editor";

const Question = ({ question }) => {
    const [isEditing, setIsEditing] = useState(false);
    const submit = (value) => {
        console.log(value);
    }

    const editedResponse = (res) => {
        setIsEditing(false);
        console.log('respuest en el propio Question!!!', res)
    }

    return (
        <Box
            as="section"
            bg="bg-surface"
            py={{
                base: '4',
                md: '8',
            }}
        >
            <Editable startWithEditView={true} defaultValue={question.question} onSubmit={submit}>
                <EditablePreview w="100%" />
                <EditableInput w="100%" />
            </Editable>
            <Container maxW="lg">
                {/* <RadioCardGroup defaultValue="one" spacing="3"> */}
                    {question.answers.map((option) => (
                        // <RadioCard key={option} value={option}>
                            <Editable startWithEditView={true} defaultValue={option} onSubmit={submit}>
                                <EditablePreview w="100%" />
                                <EditableInput w="100%" />
                            </Editable>
                        // </RadioCard>
                    ))}
                {/* </RadioCardGroup> */}
            </Container>
            <button onClick={() => setIsEditing(!isEditing)}>Mostrar Editor</button>
            {isEditing && <EditorComponent defaultValue={question.feedBack} editedResponse={editedResponse} />}
        </Box>
    )
};

export default Question;