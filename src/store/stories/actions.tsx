import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoriesStore } from '.';
import IStory from '../../interfaces/IStory';

const setStoriesStorage = async (stories: IStory[]) => {
  try {
    await AsyncStorage.setItem('@stories', JSON.stringify(stories));
  } catch (e) {
    // Saving error
  }
};

export const setStories = (stories: IStory[]) =>
  StoriesStore.update(s => {
    s.stories = stories;
  });

export const addStory = (story: IStory | null) =>
  StoriesStore.update(s => {
    if (story) s.stories.push(story);
    setStoriesStorage(s.stories);
  });

export const removeStory = (id: string) =>
  StoriesStore.update(s => {
    const removedStoryArray = s.stories.filter(item => item.id !== id);
    s.stories = removedStoryArray;
    setStoriesStorage(s.stories);
  });

export const getStoriesStorage = async () => {
  try {
    const actualStorage = await AsyncStorage.getItem('@stories');
    const stories: IStory[] = JSON.parse(actualStorage || '[]');
    return stories;
  } catch (e) {
    return [];
  }
};

export const addStoryStorage = async (value: IStory) => {
  try {
    const actualStorage = await AsyncStorage.getItem('@stories');
    const stories: IStory[] = JSON.parse(actualStorage || '[]');
    stories.push(value);
    await AsyncStorage.setItem('@stories', JSON.stringify(stories));
  } catch (e) {
    // saving error
  }
};

export const removeStoryStorage = async (value: IStory) => {
  try {
    const actualStorage = await AsyncStorage.getItem('@stories');
    const stories: IStory[] = JSON.parse(actualStorage || '[]');
    const newStories: IStory[] = stories.filter(item => item.id !== value.id);
    await AsyncStorage.setItem('@stories', JSON.stringify(newStories));
  } catch (e) {
    // remove error
  }
};
