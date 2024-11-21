import { ScrollView, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface ICustomMarkdown {
  markdownContent: string
}

export const CustomMarkdown = ({ markdownContent }: ICustomMarkdown) => {
  return (
    <ScrollView style={styles.container}>
      <Markdown style={markdownStyles}>{markdownContent}</Markdown>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
})

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  strong: {
    fontWeight: 'bold',
  },
  bullet_list: {
    marginVertical: 8,
  },
})
