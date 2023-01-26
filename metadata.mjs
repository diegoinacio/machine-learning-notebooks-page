export const HEADER = {
  title: `Machine Learning Notebooks`,
  description: `An authorial set of fundamental <span class="stripe">Python recipes</span> on <strong>Machine Learning</strong> and <strong>Artificial Intelligence</strong>.`,
};

export const INDEX = [
  // ! Machine Learning Fundamentals
  {
    id: "Machine-Learning-Fundamentals",
    name: "Machine Learning Fundamentals",
    description:
      "Walkthrough into the Machine Learning's principles and implementation of the main algorithms from scratch.",
    notebooks: [
      {
        id: "NN_activation_functions",
        name: "Activation Functions",
        description:
          "Brief overview about some of the main activation functions applicable to Neural Networks and Deep Learning system.",
      },
      {
        id: "NN_perceptron",
        name: "Perceptron",
        description:
          "Overview and implementation of the most fundamental Neural Network model.",
      },
      {
        id: "clustering_dbscan",
        name: "Clustering [DBSCAN]",
        description:
          "Overview and implementation of clustering algorithm using the <em>DBSCAN</em> technique.",
      },
      {
        id: "clustering_k-means",
        name: "Clustering [k-means]",
        description:
          "Overview and implementation of clustering algorithm using the <em>k-means</em> technique.",
      },
      {
        id: "kNN_classification",
        name: "k-NN Classification",
        description:
          "Overview and implementation of k-Nearest Neighbor Classification.",
      },
      {
        id: "kNN_regression",
        name: "k-NN Regression",
        description:
          "Overview and implementation of k-Nearest Neighbor regression.",
      },
      {
        id: "regression_linear",
        name: "Linear Regression",
        description:
          "Overview and implementation of Linear Regression analysis.",
      },
      {
        id: "regression_logistic",
        name: "Logistic Regression",
        description:
          "Overview and implementation of Logistic Regression analysis.",
      },
      {
        id: "regression_polynomial",
        name: "Polynomial Regression",
        description:
          "Overview and implementation of Polynomial Regression analysis.",
      },
    ],
  },
  // ! Deep Learning Models
  {
    id: "Deep-Learning-Models",
    name: "Deep Learning Models",
    description:
      "Demonstration and practice of the most popular <em>Deep Learning</em> models.",
    notebooks: [
      {
        id: "basics_PyTorch",
        name: "Basics [PyTorch]",
        description: "Basic functions and operations using PyTorch library.",
      },
      {
        id: "basics_TensorFlow",
        name: "Basics [TensorFlow]",
        description: "Basic functions and operations using TensorFlow library.",
      },
      {
        id: "perceptron_Keras",
        name: "Perceptron [Keras]",
        description:
          "Implementation of Perceptron model using using Keras library.",
      },
      {
        id: "perceptron_PyTorch",
        name: "Perceptron [PyTorch]",
        description:
          "Implementation of Perceptron model using using PyTorch library.",
      },
      {
        id: "perceptron_TensorFlow",
        name: "Perceptron [TensorFlow]",
        description:
          "Implementation of Perceptron model using using TensorFlow library.",
      },
      {
        id: "MCLR_Keras",
        name: "Multi-class Logistic Regression [Keras]",
        description:
          "Implementation of Multi-class Logistic Regression using Keras library.",
      },
      {
        id: "MCLR_PyTorch",
        name: "Multi-class Logistic Regression [PyTorch]",
        description:
          "Implementation of Multi-class Logistic Regression using PyTorch library.",
      },
      {
        id: "MCLR_TensorFlow",
        name: "Multi-class Logistic Regression [TensorFlow]",
        description:
          "Implementation of Multi-class Logistic Regression using TensorFlow library.",
      },
      {
        id: "neural_network_shallow_Keras",
        name: "Shallow Neural Network [Keras]",
        description:
          "Implementation of Shallow Neural Network using Keras library.",
      },
      {
        id: "neural_network_deep_Keras",
        name: "Deep Neural Network [Keras]",
        description:
          "Implementation of Deep Neural Network using Keras library.",
      },
      {
        id: "convolutional_neural_network_Keras",
        name: "Convolutional Neural Network [Keras]",
        description:
          "Implementation of Convolutional Neural Network using Keras library.",
      },
      {
        id: "autoencoder_Keras",
        name: "Autoencoder [Keras]",
        description: "Implementation of Autoencoders using Keras library.",
      },
    ],
  },
  // ! Practical Applications
  {
    id: "Practical-Applications",
    name: "Practical Applications",
    description:
      "Practical experiments and creative applications using <em>machine learning</em> techniques.",
    notebooks: [
      {
        id: "image_approximation_deepNN",
        name: "Image Approximation",
        description:
          "Image approximation and upscaling interpolation using <em>deep Neural Network</em>.",
      },
    ],
  },
  // ! Natural Language Processing
  {
    id: "Natural-Language-Processing",
    name: "Natural Language Processing",
    description:
      "Everything about <em>Natural Language Processing (NLP)</em> , from fundamental concepts to practical applications.",
    notebooks: [
      {
        id: "basics_NLTK",
        name: "Basics [NLTK]",
        description: "Basics aspects of <em>Natural Language Toolkit</em>.",
      },
    ],
  },
  // ! Mathematical Foundations
  {
    id: "Mathematical-Foundations",
    name: "Mathematical Foundations",
    description:
      "Main mathematical concepts applied to <em>Machine Learning</em>.",
    notebooks: [
      {
        id: "calculus_fourier-series",
        name: "Calculus - Fourier Series",
        description: "Brief overview of <em>Fourier series</em>.",
      },
      {
        id: "linear-algebra_vectors",
        name: "Linear Algebra - Vectors",
        description: "Linear Algebra topic about <em>Vectors</em>.",
      },
      {
        id: "linear-algebra_matrices",
        name: "Linear Algebra - Matrices",
        description: "Linear Algebra topic about <em>Matrices</em>.",
      },
      {
        id: "dissimilarity_measures",
        name: "Dissimilarity Measure",
        description: "Overview about dissimilarity and distance measure.",
      },
    ],
  },
  // ! Tips & Tricks
  {
    id: "Tips-and-Tricks",
    name: "Tips & Tricks",
    description:
      "<p>A gathering of <em>Tips &amp; Tricks</em> involving any supporting information for <em>machine learning</em> in general.</p>",
    notebooks: [
      {
        id: "kaggle-data",
        name: "Kaggle data",
        description:
          "Methods to obtain datasets from the <em>Kaggle</em> platform.",
      },
      {
        id: "connect_openai_api",
        name: "Connect to OpenAI API",
        description:
          "Step by step how to connect to <strong>OpenAI API</strong> and brief introduction.",
      },
      {
        id: "basics_Numba",
        name: "Basics [Numba]",
        description:
          "Basic functions and high performance operations using Numba and Python.",
      },
      {
        id: "basics_Cython",
        name: "Basics [Cython]",
        description:
          "Basic functions and high performance operations using Cython and Python.",
      },
    ],
  },
];
