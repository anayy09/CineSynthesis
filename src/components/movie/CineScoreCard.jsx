import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip, Switch, FormControlLabel, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ScoreCircle = styled(Box)(({ theme, color }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '2.5rem',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  margin: '0 auto',
}));

const ReliabilityChip = styled(Chip)(({ theme, reliability }) => {
  const colors = {
    high: theme.palette.success.main,
    medium: theme.palette.warning.main,
    low: theme.palette.error.main,
  };
  
  return {
    backgroundColor: colors[reliability] || theme.palette.grey[500],
    color: theme.palette.common.white,
    fontWeight: 'bold',
  };
});

const getCineScoreColor = (score) => {
  if (score >= 8) return '#4CAF50'; // Green for high scores
  if (score >= 6) return '#FFC107'; // Yellow for medium scores
  if (score >= 4) return '#FF9800'; // Orange for below average
  return '#F44336'; // Red for poor scores
};

const CineScoreCard = ({ 
  cineScore, 
  onToggleAudienceFocus, 
  audienceFocused = false
}) => {
  // Get reliability text and color
  const getReliabilityLabel = (reliability) => {
    switch (reliability) {
      case 'high': return 'High Reliability';
      case 'medium': return 'Medium Reliability';
      case 'low': return 'Low Reliability';
      default: return 'Unknown Reliability';
    }
  };

  // Format tooltip content explaining the score
  const getTooltipContent = () => {
    if (!cineScore) return 'No rating data available';
    
    const { usedSources, audienceFocused } = cineScore;
    
    return (
      <>
        <Typography variant="subtitle2" gutterBottom>
          CineScore Calculation
        </Typography>
        <Typography variant="body2" gutterBottom>
          Based on {usedSources.length} source{usedSources.length !== 1 ? 's' : ''}:
        </Typography>
        <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
          {usedSources.map((source) => (
            <li key={source}>
              <Typography variant="body2">{source}</Typography>
            </li>
          ))}
        </ul>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {audienceFocused 
            ? 'Weighted towards audience scores' 
            : 'Weighted towards critic scores'}
        </Typography>
      </>
    );
  };

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            CineScore™
          </Typography>
          <Tooltip title={getTooltipContent()} arrow placement="top">
            <InfoOutlinedIcon sx={{ ml: 1, color: 'text.secondary', cursor: 'help' }} />
          </Tooltip>
        </Box>

        {cineScore && cineScore.reliability && (
          <Box sx={{ mb: 3 }}>
            <ReliabilityChip 
              label={getReliabilityLabel(cineScore.reliability)} 
              reliability={cineScore.reliability}
              size="small"
            />
          </Box>
        )}
        
        <Box sx={{ mb: 3 }}>
          <ScoreCircle color={cineScore ? getCineScoreColor(cineScore.score) : '#9e9e9e'}>
            {cineScore ? cineScore.score.toFixed(1) : 'N/A'}
          </ScoreCircle>
        </Box>
        
        <Box sx={{ mt: 'auto' }}>
          <FormControlLabel
            control={
              <Switch 
                checked={audienceFocused} 
                onChange={onToggleAudienceFocus}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                {audienceFocused ? 'Audience Focused' : 'Critic Focused'}
              </Typography>
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CineScoreCard;