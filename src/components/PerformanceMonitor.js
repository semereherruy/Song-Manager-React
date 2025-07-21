import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const MonitorContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  font-family: monospace;
  z-index: 1000;
  min-width: 200px;
`;

const Metric = styled.div`
  margin: 2px 0;
`;

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
  });

  useEffect(() => {
    // Measure initial render time
    const startTime = performance.now();
    
    const measurePerformance = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Get memory usage if available
      const memoryUsage = performance.memory 
        ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
        : 0;
      
      // Estimate bundle size (this is a rough estimate)
      const bundleSize = document.querySelectorAll('script').length * 100; // Rough estimate
      
      setMetrics({
        renderTime: Math.round(renderTime),
        memoryUsage,
        bundleSize,
      });
    };

    // Measure after a short delay to allow for initial render
    const timer = setTimeout(measurePerformance, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <MonitorContainer>
      <Metric>⏱️ Render: {metrics.renderTime}ms</Metric>
      <Metric>💾 Memory: {metrics.memoryUsage}MB</Metric>
      <Metric>📦 Scripts: {metrics.bundleSize}</Metric>
    </MonitorContainer>
  );
}

export default PerformanceMonitor; 