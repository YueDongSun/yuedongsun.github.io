import profile_json from './profile.json';
import { parse_profile } from '../lib/profile_contract';

export const profile = parse_profile(profile_json);
export const github_url = `https://github.com/${profile.github_username}`;
