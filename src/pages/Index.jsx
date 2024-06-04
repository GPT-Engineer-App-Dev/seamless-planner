import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Heading, IconButton, Box, Text } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? editingText : task));
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Todo App</Heading>
        <HStack width="100%">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">Add Task</Button>
        </HStack>
        <VStack width="100%" spacing={3} mt={4}>
          {tasks.map((task, index) => (
            <HStack key={index} width="100%" justifyContent="space-between" p={2} borderWidth="1px" borderRadius="md">
              {editingIndex === index ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <Text>{task}</Text>
              )}
              <HStack>
                {editingIndex === index ? (
                  <Button onClick={() => saveTask(index)} colorScheme="teal">Save</Button>
                ) : (
                  <IconButton
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => editTask(index)}
                  />
                )}
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(index)}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;