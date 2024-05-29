import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const HelpCenterAccordion: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const DATA: FAQ[] = [
    { id: '1', question: 'What is ReVe?', answer: 'ReVe is the first inclusive digital renting app in Indonesia that allows you to experience many kind of styles in fashion.' },
    { id: '2', question: 'How to cancel order after shipping?', answer: 'Contact Our Customer Service at +6285213456879.' },
    { id: '3', question: 'Where can I find my order history?', answer: 'Your order history can be found in History page.' },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [sectionId]: !prevExpandedSections[sectionId],
    }));
  };

  const renderItem = ({ item }: { item: FAQ }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => toggleSection(item.id)} style={styles.questionContainer}>
          <Text style={styles.question}>{item.question}</Text>
        </TouchableOpacity>
        {expandedSections[item.id] && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
  },
  questionContainer: {
    padding: 12,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,

  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answerContainer: {
    padding: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  answer: {
    fontSize: 14,
    color: '#333',
  },
});

export default HelpCenterAccordion;
