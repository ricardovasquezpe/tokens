import { Box, Button, Grid, GridItem, Input, InputGroup, InputLeftAddon, Text, VStack } from '@chakra-ui/react';
import './App.css';
import { useForm } from 'react-hook-form';
import { sendTokens } from './services/api.service';

function App() {
  const { register: trasnfer, trigger: trasnferTrigger, getValues: trasnferGetValues, formState: { errors }, setValue: trasnferSetValue  } = useForm();

  const handlePrecioChange = (e: any) => {
    let input = e.target.value;
    input = input.replace(/[^0-9.]/g, "");
    if (input.split(".").length > 2) {
        input = input.slice(0, -1);
    }

    trasnferSetValue("amount", input);
  }

  const send = async () => {
    var response = await sendTokens({
        "usuario": "Consultorio.Virtual",
        "password": "252622c5397efd7801d105c578d69d3d"
    });
    console.log(response);
    
    const isValid = await trasnferTrigger(["amount", "wallet_from", "wallet_to"], { shouldFocus: true });
    if(!isValid){
      return;
    }


  }

  return (
    <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "md": "40px 250px", "lg": "40px 350px", "xl": "40px 450px"}}>
      <Grid templateColumns='repeat(2, 1fr)' gap={3}>
        <GridItem colSpan={{base: 2, sm: 2, md: 2}}>
          <VStack gap={3} align={"start"}>
            <Text>Monto a enviar</Text>
            <InputGroup>
                <InputLeftAddon>
                    #
                </InputLeftAddon>
                <Input type='text'
                        {...trasnfer("amount",{
                            required: "El monto es requerido",
                            onChange: (e) => { handlePrecioChange(e) },
                            min: 1
                        })}
                        placeholder='1' />
            </InputGroup>
            <Text>Direccion de Wallet Origen</Text>
            <Input type='text' placeholder='1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71' 
                  {...trasnfer("wallet_from",{
                    required: "La direccion de origen es requerido"
                  })}/>
            <Text>Direccion de Wallet Destino</Text>
            <Input type='text' placeholder='1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71'
                  {...trasnfer("wallet_to",{
                    required: "La direccion de destino es requerido"
                  })}/>
            <Button width={"100%"} onClick={send}>Enviar</Button>
            <Box textAlign={"center"} width={"100%"}>
              <Text className='error'>Error message</Text>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default App
