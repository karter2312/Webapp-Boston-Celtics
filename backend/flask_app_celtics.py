from flask import Flask, jsonify, request
import pandas as pd
import json

# Import the functions from your existing code
from main import load_data, preprocess_data, train_model, identify_key_players, generate_matchups, simulate_matchup_scenarios

app = Flask(__name__)

# Load and preprocess the data
data_frames = load_data()
player_stats_df = preprocess_data(data_frames)
model, model_features, accuracy, report = train_model(player_stats_df)

team_mapping = {
    'BOS': 'Boston Celtics',
    'DAL': 'Dallas Mavericks',
    'MIN': 'Minnesota Timberwolves'
}

key_players = identify_key_players(player_stats_df, team_mapping)
selected_teams = ['Boston Celtics', 'Dallas Mavericks', 'Minnesota Timberwolves']
matchups = generate_matchups(selected_teams)

# Simulate the matchups
results_df = simulate_matchup_scenarios(matchups, key_players, player_stats_df, model, model_features)

@app.route('/api/stats', methods=['GET'])
def get_player_stats():
    """Endpoint to get player stats"""
    player_stats = player_stats_df.to_dict(orient='records')
    return jsonify(player_stats)

@app.route('/api/matchup_results', methods=['GET'])
def get_matchup_results():
    """Endpoint to get matchup simulation results"""
    results = results_df.to_dict(orient='records')
    return jsonify(results)

@app.route('/api/predict_matchup', methods=['POST'])
def predict_matchup():
    """Endpoint to predict matchups for given player stats"""
    data = request.json
    player1_stats = pd.Series(data['player1'])
    player2_stats = pd.Series(data['player2'])

    # Combine player stats for prediction
    combined_stats = pd.concat([player1_stats, player2_stats])
    combined_stats_df = pd.DataFrame([combined_stats])

    # Predict the result
    prediction = model.predict(combined_stats_df)[0]

    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
