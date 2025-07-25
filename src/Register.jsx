import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@chakra-ui/react"

// const books = [
//   "Bhagavad Gita As It Is",
//   "Science of Self-Realization",
//   "Journey of Self-Discovery",
//   "Beyond Birth and Death",
//   "Perfect Questions, Perfect Answers",
//   "Life Comes From Life",
//   "The Quest for Enlightenment",
// ]
const books = [
  "Bhagavad-gītā As It Is",
  "Śrīmad-Bhāgavatam",
  "Śrī Caitanya-caritāmṛta",
  "Nectar of Instruction",
  "Kṛṣṇa, the Supreme Personality of Godhead",
  "The Nectar of Devotion",
  "Śrī Īśopaniṣad",
  "The Science of Self-Realization",
  "Beyond Birth and Death",
  "Bhakti: The Art of Eternal Love",
  "Śrī Brahma-saṁhitā",
  "Civilization and Transcendence",
  "The Path of Perfection",
  "On the Way to Kṛṣṇa",
  "The Journey of Self-Discovery",
  "Rāja-vidyā: The King of Knowledge",
  "Perfect Questions, Perfect Answers",
  "The Perfection of Yoga",
  "Teachings of Lord Kapila",
  "Teachings of Lord Caitanya",
  "A Second Chance",
  "Chant and be happy",
  "Light of the Bhāgavata",
  "Teachings of Queen Kuntī",
  "Mahābhārata - Retold by Kṛṣṇa Dharma dasa",
  "Rāmāyaṇa",
  "Śrīla Prabhupāda-līlāmṛta"
];


const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    age: "",
    collegeOrWorking: "",
    place: "",
    selectedBook: "",
    interestedInGitaSession: "",
    folkOrCongregation:"",
  })
  const [errors, setErrors] = useState({})
  const toast = useToast()
  // const [books, setBooks] = useState([]);
const [bookLoading, setBookLoading] = useState(true);

// useEffect(() => {
//   const fetchBooks = async () => {
//     try {
//       const response = await fetch("https://razor-pay-server-production.up.railway.app/book/getAllBooks");
//       const data = await response.json();
//       setBooks(data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     } finally {
//       setBookLoading(false);
//     }
//   };

//   fetchBooks();
// }, []);


  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required"
    } else if (/^\+/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "Please do not include country code (e.g., +91)"
    } else if (!/^[0-9]{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "Enter exactly 10 digits"
    }

    if (formData.age && (parseInt(formData.age) < 1 || parseInt(formData.age) > 120)) {
      newErrors.age = "Please enter a valid age"
    }

    if (!formData.interestedInGitaSession) {
      newErrors.interestedInGitaSession = "Please select an option"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("https://razor-pay-server-389286764509.asia-south1.run.app/book/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : undefined,
          interestedInGitaSession: formData.interestedInGitaSession === "yes",
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      toast({
        title: "Registration successful!",
        description: "You will receive a WhatsApp confirmation shortly.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      setFormData({
        name: "",
        whatsappNumber: "",
        age: "",
        collegeOrWorking: "",
        place: "",
        selectedBook: "",
        interestedInGitaSession: "",
         folkOrCongregation: ""
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxW="container.md" py={10} my={10}>
      <Card variant="outline" boxShadow="md">
        <CardHeader>
          <Heading as="h1" size="xl" textAlign="center" mb={2}>
           Srila Prabhupada's
Book Distribution
          </Heading>
          <Text textAlign="center" color="gray.600">
            Please fill out this form to receive your selected book
          </Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.whatsappNumber} isRequired>
                <FormLabel>WhatsApp Number</FormLabel>
                <Input
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                  placeholder="Enter 10-digit WhatsApp number"
                />
                <Text fontSize="sm" color="gray.500">
                 
                </Text>
                <FormErrorMessage>{errors.whatsappNumber}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.age}>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter your age"
                />
                <FormErrorMessage>{errors.age}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>College or Working</FormLabel>
                <Select
                  value={formData.collegeOrWorking}
                  onChange={(e) => handleInputChange("collegeOrWorking", e.target.value)}
                  placeholder="Select your occupation"
                >
                  <option value="college">College Student</option>
                  <option value="working">Working Professional</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Place</FormLabel>
                <Input
                  value={formData.place}
                  onChange={(e) => handleInputChange("place", e.target.value)}
                  placeholder="Enter your city/town"
                />
              </FormControl>

             <FormControl>
  <FormLabel>Select Book</FormLabel>
  <Select
    value={formData.selectedBook}
    onChange={(e) => handleInputChange("selectedBook", e.target.value)}
    placeholder="Select a book"
  >
    {books.map((book, index) => (
      <option key={index} value={book}>
        {book}
      </option>
    ))}
  </Select>
</FormControl>
                    <FormControl>
  <FormLabel>FOLK / Congregation</FormLabel>


  <Select
    value={formData.folkOrCongregation}
    onChange={(e) => handleInputChange("folkOrCongregation", e.target.value)}
    placeholder="Select one"
  >
    <option value="FOLK">FOLK</option>
    <option value="Congregation">Congregation</option>
   
  </Select>
</FormControl>

              <FormControl isInvalid={!!errors.interestedInGitaSession} isRequired>
                <FormLabel>Interested in Gita Session?</FormLabel>
                <RadioGroup
                  value={formData.interestedInGitaSession}
                  onChange={(value) => handleInputChange("interestedInGitaSession", value)}
                >
                  <Stack direction="row" spacing={5}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>{errors.interestedInGitaSession}</FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                width="full"
                loadingText="Submitting..."
              >
                Submit
              </Button>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Container>
  )
}

export default Register
