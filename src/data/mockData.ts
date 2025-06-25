import { BlogPost, Author } from '../types/blog';

export const author: Author = {
  name: 'Alex Johnson',
  bio: 'DevOps Engineer & Cloud Architect passionate about automation, infrastructure, and modern software development practices.',
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Kubernetes: A Comprehensive Guide',
    excerpt: 'Learn the fundamentals of Kubernetes orchestration and how to deploy your first application to a cluster.',
    content: `# Getting Started with Kubernetes: A Comprehensive Guide

Kubernetes has revolutionized the way we deploy and manage containerized applications. In this comprehensive guide, we'll explore the fundamentals of Kubernetes and walk through deploying your first application.

## What is Kubernetes?

Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.

## Key Concepts

### Pods
Pods are the smallest deployable units in Kubernetes. They represent a group of one or more containers that share storage and network resources.

### Services
Services provide a stable network endpoint for accessing pods, enabling load balancing and service discovery.

### Deployments
Deployments manage the lifecycle of pods, ensuring the desired number of replicas are running and handling updates.

## Your First Deployment

Let's create a simple nginx deployment:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
\`\`\`

## Best Practices

1. **Resource Limits**: Always set resource requests and limits for your containers
2. **Health Checks**: Implement liveness and readiness probes
3. **Security**: Use non-root users and security contexts
4. **Monitoring**: Set up proper logging and monitoring

## Conclusion

Kubernetes provides a powerful platform for running containerized applications at scale. Start small, learn the basics, and gradually expand your knowledge as you build more complex systems.`,
    author: 'Alex Johnson',
    category: 'DevOps',
    tags: ['kubernetes', 'containers', 'deployment', 'beginner'],
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-15',
    status: 'published',
    featuredImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    readTime: 8,
  },
  {
    id: '2',
    title: 'AWS Lambda Best Practices for Production Applications',
    excerpt: 'Discover essential best practices for building scalable and cost-effective serverless applications with AWS Lambda.',
    content: `# AWS Lambda Best Practices for Production Applications

AWS Lambda has transformed how we build and deploy applications, offering true serverless computing with automatic scaling and pay-per-execution pricing.

## Performance Optimization

### Cold Start Mitigation
- Keep your deployment packages small
- Use provisioned concurrency for critical functions
- Implement connection pooling for database connections

### Memory Configuration
Choose the right memory allocation based on your function's needs. More memory means more CPU power and potentially faster execution.

## Security Best Practices

1. **Least Privilege**: Grant only necessary permissions
2. **Environment Variables**: Use AWS Systems Manager for sensitive data
3. **VPC Configuration**: Place Lambda in VPC only when necessary

## Cost Optimization

- Monitor and optimize function duration
- Use appropriate memory settings
- Implement proper error handling to avoid retries

## Monitoring and Debugging

Leverage AWS CloudWatch, X-Ray, and custom metrics for comprehensive monitoring of your Lambda functions.`,
    author: 'Alex Johnson',
    category: 'Cloud',
    tags: ['aws', 'lambda', 'serverless', 'production'],
    publishedAt: '2025-01-12',
    updatedAt: '2025-01-12',
    status: 'published',
    featuredImage: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    readTime: 6,
  },
  {
    id: '3',
    title: 'Building Scalable React Applications with TypeScript',
    excerpt: 'Learn advanced patterns and best practices for creating maintainable React applications using TypeScript.',
    content: `# Building Scalable React Applications with TypeScript

TypeScript brings type safety and enhanced developer experience to React applications. This guide covers advanced patterns for building scalable applications.

## Project Structure

Organize your project with clear separation of concerns:

\`\`\`
src/
  components/
    common/
    features/
  hooks/
  services/
  types/
  utils/
\`\`\`

## Advanced Component Patterns

### Generic Components
Create reusable components with TypeScript generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
\`\`\`

## State Management

Use TypeScript with modern state management solutions like Zustand or Redux Toolkit for type-safe state management.

## Performance Optimization

- Implement proper memoization with React.memo and useMemo
- Use code splitting with React.lazy
- Optimize bundle size with tree shaking

## Testing Strategy

Write comprehensive tests using Jest and React Testing Library with TypeScript support.`,
    author: 'Alex Johnson',
    category: 'Software Development',
    tags: ['react', 'typescript', 'frontend', 'scalability'],
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    status: 'published',
    featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    readTime: 10,
  },
  {
    id: '4',
    title: 'CI/CD Pipeline with GitHub Actions and Docker',
    excerpt: 'Build a complete CI/CD pipeline using GitHub Actions, Docker, and automated testing for modern development workflows.',
    content: `# CI/CD Pipeline with GitHub Actions and Docker

Continuous Integration and Continuous Deployment are essential for modern software development. Let's build a complete pipeline using GitHub Actions and Docker.

## Pipeline Overview

Our pipeline will:
1. Run automated tests
2. Build Docker images
3. Deploy to staging/production environments

## GitHub Actions Workflow

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t myapp .
      - name: Push to registry
        run: docker push myapp
\`\`\`

## Docker Best Practices

- Use multi-stage builds
- Optimize layer caching
- Implement proper health checks
- Use distroless images for production

## Security Considerations

- Scan images for vulnerabilities
- Use secrets management
- Implement proper access controls`,
    author: 'Alex Johnson',
    category: 'DevOps',
    tags: ['cicd', 'github-actions', 'docker', 'automation'],
    publishedAt: '2025-01-08',
    updatedAt: '2025-01-08',
    status: 'published',
    featuredImage: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    readTime: 7,
  },
  {
    id: '5',
    title: 'Microservices Architecture with Node.js',
    excerpt: 'Design and implement a robust microservices architecture using Node.js, focusing on scalability and maintainability.',
    content: `# Microservices Architecture with Node.js

Microservices architecture enables building scalable, maintainable applications by breaking them into smaller, independent services.

## Service Design Principles

### Single Responsibility
Each service should have one business responsibility and do it well.

### API-First Design
Design APIs before implementation to ensure clear contracts between services.

### Data Ownership
Each service should own its data and not share databases with other services.

## Communication Patterns

### Synchronous Communication
Use HTTP/REST for real-time operations and direct service-to-service calls.

### Asynchronous Communication
Implement event-driven architecture using message queues for loose coupling.

\`\`\`javascript
// Event publisher
const EventEmitter = require('events');
class OrderService extends EventEmitter {
  createOrder(orderData) {
    const order = this.processOrder(orderData);
    this.emit('order.created', order);
    return order;
  }
}
\`\`\`

## Service Discovery

Implement service discovery using tools like Consul or built-in Kubernetes features.

## Monitoring and Observability

- Distributed tracing
- Centralized logging
- Health check endpoints
- Circuit breakers for resilience`,
    author: 'Alex Johnson',
    category: 'Software Development',
    tags: ['microservices', 'nodejs', 'architecture', 'scalability'],
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    status: 'published',
    featuredImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    readTime: 12,
  },
];